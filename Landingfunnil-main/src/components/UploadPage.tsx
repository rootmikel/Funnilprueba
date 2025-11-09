import { useState } from "react";
import { TicketUpload } from "./TicketUpload";
import { Button } from "./ui/button";
import { toast } from "sonner@2.0.3";

interface UploadPageProps {
  onTicketVerified: (ticketFile: File) => void;
}

export function UploadPage({ onTicketVerified }: UploadPageProps) {
  const [ticketFile, setTicketFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!ticketFile) {
      setError("Por favor, sube una foto de tu ticket de compra");
      toast.error("Por favor, sube una foto de tu ticket de compra");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      // Prepare form data for webhook validation
      const formData = new FormData();
      formData.append("data", ticketFile, ticketFile.name);
      formData.append("action", "validate_ticket");
      formData.append("timestamp", new Date().toISOString());
      
      // Log what we're sending
      console.log("=== VALIDATING TICKET WITH WEBHOOK ===");
      console.log("URL:", "https://pruebas-n8nupdateted.bzbud5.easypanel.host/webhook/3bcf743c-fc0f-4e38-b27f-d8ebce2687e2");
      console.log("File:", {
        name: ticketFile.name,
        size: ticketFile.size,
        type: ticketFile.type,
      });
      console.log("FormData entries:");
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: [File] ${value.name} (${value.size} bytes, ${value.type})`);
        } else {
          console.log(`  ${key}:`, value);
        }
      }

      // Send to webhook for validation with timeout
      console.log("Sending validation request...");
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      try {
        const response = await fetch(
          "https://pruebas-n8nupdateted.bzbud5.easypanel.host/webhook/3bcf743c-fc0f-4e38-b27f-d8ebce2687e2",
          {
            method: "POST",
            mode: "cors",
            body: formData,
            signal: controller.signal,
          }
        );
        
        clearTimeout(timeoutId);

        console.log("=== WEBHOOK VALIDATION RESPONSE ===");
        console.log("Status:", response.status);
        console.log("Status Text:", response.statusText);
        console.log("Headers:", Object.fromEntries(response.headers.entries()));

        // Only accept 200 status
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Webhook returned error status:", response.status);
          console.error("Error response:", errorText);
          throw new Error("Ticket no válido");
        }

        // Get response from webhook - MUST be JSON
        const responseText = await response.text();
        console.log("Response body:", responseText);

        let responseData: any = null;
        try {
          responseData = JSON.parse(responseText);
          console.log("Parsed response:", responseData);
        } catch (e) {
          console.error("Response is not valid JSON");
          throw new Error("Ticket no válido");
        }

        // Check if webhook response has the expected structure with myField
        if (!responseData || typeof responseData.myField === 'undefined') {
          console.error("Response does not contain 'myField':", responseData);
          throw new Error("Ticket no válido");
        }

        // myField MUST be exactly "true" (as string)
        if (responseData.myField !== "true") {
          console.error("myField is not 'true':", responseData.myField);
          throw new Error("Ticket no válido");
        }

        console.log("✓ Ticket validated successfully");
        console.log("✓ Webhook returned valid response with myField:", responseData.myField);
        toast.success("Ticket verificado");
        onTicketVerified(ticketFile);
        
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          throw new Error("La petición tardó demasiado. Verifica tu conexión a internet.");
        }
        
        // Check for network errors
        if (fetchError instanceof TypeError && fetchError.message === 'Failed to fetch') {
          console.error("Network error details:");
          console.error("- Possible CORS issue");
          console.error("- Webhook might not be accessible");
          console.error("- Check if n8n webhook is active");
          throw new Error("No se pudo conectar al servidor. Verifica que el webhook de n8n esté activo y tenga CORS habilitado.");
        }
        
        throw fetchError;
      }
      
    } catch (error) {
      console.error("=== VALIDATION ERROR ===");
      console.error("Error type:", error instanceof Error ? error.constructor.name : typeof error);
      console.error("Error details:", error);
      
      let errorMessage = "Hubo un error al verificar tu ticket. Por favor, inténtalo de nuevo.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <h2 className="text-red-500 mb-4">Verifica tu Compra</h2>
          <p className="text-gray-400">
            Para participar en la votación, sube una foto de tu ticket de compra
          </p>
        </div>

        <TicketUpload onFileSelect={setTicketFile} error={error} />

        <div className="text-center mt-8">
          <Button
            onClick={handleContinue}
            size="lg"
            disabled={isVerifying || !ticketFile}
            className="bg-red-600 hover:bg-red-700 text-white px-12 py-6 text-lg shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40 transition-all"
          >
            {isVerifying ? "Verificando ticket..." : "Continuar a Votar"}
          </Button>
          <p className="mt-4 text-gray-500">
            El ticket debe ser válido y legible
          </p>
        </div>
      </div>
    </div>
  );
}
