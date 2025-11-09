import { CheckCircle, Star, Heart } from "lucide-react";
import { currentMonthBurger } from "./VotingPage";

interface ThankYouPageProps {
  userRating: number;
}

export function ThankYouPage({ userRating }: ThankYouPageProps) {
  return (
    <div className="py-12 px-4 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-red-950/50 border-2 border-red-500/50 rounded-full mb-8 animate-pulse">
          <CheckCircle className="w-14 h-14 text-red-500" />
        </div>
        
        <h2 className="text-red-500 mb-4">¡Gracias por tu Valoración!</h2>
        
        <div className="bg-zinc-900/50 border border-red-900/20 rounded-xl p-8 mb-6">
          <p className="text-gray-300 mb-4">
            Tu valoración de <span className="text-red-500">{currentMonthBurger.name}</span> ha sido recibida exitosamente
          </p>
          
          <div className="flex justify-center gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 ${
                  star <= userRating
                    ? "fill-red-500 text-red-500"
                    : "fill-transparent text-gray-600"
                }`}
              />
            ))}
          </div>
          
          <div className="text-gray-400 space-y-3">
            <p className="text-center">
              Tu opinión es muy valiosa para nosotros
            </p>
            <p>
              Vuelve el próximo mes para probar y valorar nuestra nueva hamburguesa especial
            </p>
          </div>
        </div>
        
        <p className="text-gray-500">
          Te esperamos pronto en <span className="text-red-500">O Funil - Tragos e Bocados</span>
        </p>
      </div>
    </div>
  );
}
