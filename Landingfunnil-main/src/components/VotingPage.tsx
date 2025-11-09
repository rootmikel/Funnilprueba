import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

// Hamburguesa del mes actual - esto cambiaría cada mes
const currentMonthBurger = {
  id: "burger-oct-2025",
  name: "Can de Presa",
  month: "Octubre 2025",
  description: "Carne angus premium, queso cheddar madurado, lechuga fresca, tomate, cebolla caramelizada y nuestra salsa secreta.",
  imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyfGVufDF8fHx8MTc2MDA5NDA4NHww&ixlib=rb-4.1.0&q=80&w=1080",
};

interface VotingPageProps {
  ticketFile: File;
  onVoteSubmitted: (rating: number) => void;
}

export function VotingPage({ ticketFile, onVoteSubmitted }: VotingPageProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (rating === 0) {
      setError("Por favor, selecciona una valoración");
      toast.error("Por favor, selecciona una valoración");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Prepare form data for webhook
      const formData = new FormData();
      
      // Add rating
      formData.append("rating", rating.toString());
      
      // Add burger information
      formData.append("burgerName", currentMonthBurger.name);
      formData.append("burgerId", currentMonthBurger.id);
      formData.append("month", currentMonthBurger.month);
      
      // Add ticket image again for the vote record
      formData.append("data", ticketFile, ticketFile.name);
      
      // Add action to differentiate from validation
      formData.append("action", "submit_vote");
      
      // Add timestamp
      formData.append("timestamp", new Date().toISOString());
      
      // Log what we're sending
      console.log("=== SUBMITTING VOTE TO WEBHOOK ===");
      console.log("Rating:", rating);
      console.log("Burger:", {
        name: currentMonthBurger.name,
        id: currentMonthBurger.id,
        month: currentMonthBurger.month,
      });
      console.log("File:", {
        name: ticketFile.name,
        size: ticketFile.size,
        type: ticketFile.type,
      });

      // Send to webhook
      console.log("Sending vote...");
      const response = await fetch(
        "https://pruebas-n8nupdateted.bzbud5.easypanel.host/webhook/91981f58-84ea-4cec-8b1e-1de9e5e85406",
        {
          method: "POST",
          body: formData,
        }
      );

      console.log("=== WEBHOOK RESPONSE ===");
      console.log("Status:", response.status);
      console.log("Status Text:", response.statusText);

      const responseText = await response.text();
      console.log("Response body:", responseText);

      if (!response.ok) {
        console.error("Webhook returned error status:", response.status);
        throw new Error("Error al enviar el voto");
      }

      // Try to parse as JSON
      let responseData: any = {};
      try {
        responseData = JSON.parse(responseText);
        console.log("Parsed response:", responseData);
      } catch (e) {
        console.log("Response is not JSON");
      }
      
      console.log("✓ Vote submitted successfully");
      toast.success("¡Tu valoración ha sido enviada!");
      onVoteSubmitted(rating);
    } catch (error) {
      console.error("=== ERROR ===");
      console.error("Error details:", error);
      toast.error("Hubo un error al enviar tu valoración. Por favor, inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full mb-4">
            Hamburguesa del Mes
          </div>
          <h2 className="text-red-500 mb-2">{currentMonthBurger.month}</h2>
          <p className="text-gray-400">
            Valora nuestra hamburguesa especial de este mes
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-red-900/20 rounded-xl overflow-hidden mb-8">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={currentMonthBurger.imageUrl}
              alt={currentMonthBurger.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <h3 className="text-gray-200 mb-4">{currentMonthBurger.name}</h3>
            <p className="text-gray-400 mb-6">
              {currentMonthBurger.description}
            </p>

            <div className="border-t border-red-900/20 pt-6">
              <p className="text-gray-300 text-center mb-4">
                ¿Qué te pareció esta hamburguesa?
              </p>
              
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-all transform hover:scale-110 focus:outline-none"
                    disabled={isSubmitting}
                  >
                    <Star
                      className={`w-12 h-12 transition-colors ${
                        star <= (hoveredRating || rating)
                          ? "fill-red-500 text-red-500"
                          : "fill-transparent text-gray-600 hover:text-gray-500"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="text-center mb-6">
                {rating > 0 ? (
                  <p className="text-gray-400">
                    Tu valoración:{" "}
                    <span className="text-red-500">
                      {rating} {rating === 1 ? "estrella" : "estrellas"}
                    </span>
                  </p>
                ) : (
                  <p className="text-gray-500">
                    Haz clic en las estrellas para valorar
                  </p>
                )}
              </div>

              {error && (
                <p className="text-red-500 text-center mb-4">{error}</p>
              )}

              <Button
                onClick={handleSubmit}
                size="lg"
                disabled={isSubmitting || rating === 0}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-6 shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40 transition-all"
              >
                {isSubmitting ? "Enviando valoración..." : "Enviar Valoración"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { currentMonthBurger };
