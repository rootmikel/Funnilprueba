import { useState, useEffect } from "react";
import { UploadPage } from "./components/UploadPage";
import { VotingPage } from "./components/VotingPage";
import { ThankYouPage } from "./components/ThankYouPage";
import { Toaster } from "./components/ui/sonner";
import { Separator } from "./components/ui/separator";
import { Facebook, Twitter, Instagram, Heart } from "lucide-react";

type PageState = "upload" | "voting" | "thankyou";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageState>("upload");
  const [ticketFile, setTicketFile] = useState<File | null>(null);
  const [userRating, setUserRating] = useState<number>(0);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleTicketVerified = (file: File) => {
    setTicketFile(file);
    setCurrentPage("voting");
  };

  const handleVoteSubmitted = (rating: number) => {
    setUserRating(rating);
    setCurrentPage("thankyou");
  };

  const handleLogoClick = () => {
    setCurrentPage("upload");
    setTicketFile(null);
    setUserRating(0);
  };

  return (
    <div className="min-h-screen bg-black">
      <Toaster position="bottom-center" />
      
      {/* Header */}
      <header className="bg-black/80 border-b border-red-900/20 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <img 
              src="/IMG_6204.PNG" 
              alt="O Funil" 
              className="h-20 w-auto cursor-pointer hover:opacity-80 transition-opacity"
              onClick={handleLogoClick}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        {currentPage === "upload" && (
          <UploadPage onTicketVerified={handleTicketVerified} />
        )}
        
        {currentPage === "voting" && ticketFile && (
          <VotingPage ticketFile={ticketFile} onVoteSubmitted={handleVoteSubmitted} />
        )}
        
        {currentPage === "thankyou" && (
          <ThankYouPage userRating={userRating} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-red-900/20 text-white py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-red-500 mb-4">O Funil</h3>
              <p className="text-gray-400">
                Tragos e Bocados - Celebramos la pasión por las hamburguesas con este concurso único. 
                ¡Tu opinión cuenta!
              </p>
            </div>
            <div>
              <h3 className="text-red-500 mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-red-500 mb-4">Síguenos</h3>

            </div>
          </div>
          <Separator className="my-8 bg-red-900/20" />
          <p className="text-center text-gray-500">
            © 2025 O Funil - Tragos e Bocados. Todos los derechos reservados.
            <br />
            <span className="text-gray-600 text-sm inline-flex items-center justify-center gap-1">
              Con{" "}
              <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse inline-block" />
              {" "}por{" "}
              <a 
                href="https://astraeai.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 transition-colors underline"
              >
                astraeAI
              </a>
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}
