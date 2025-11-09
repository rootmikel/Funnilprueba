import { useEffect, useState } from "react";
import { Trophy, Star, Calendar } from "lucide-react";

interface BurgerRanking {
  id: string;
  name: string;
  month: string;
  averageRating: number;
  totalVotes: number;
  imageUrl: string;
}

interface ResultsPageProps {
  userRating: number;
}

export function ResultsPage({ userRating }: ResultsPageProps) {
  const [rankings, setRankings] = useState<BurgerRanking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading ranking data
    // In a real app, this would fetch from your backend/webhook
    setTimeout(() => {
      setRankings([
        {
          id: "burger-oct-2025",
          name: "La Clásica Suprema",
          month: "Octubre 2025",
          averageRating: 4.5,
          totalVotes: 342,
          imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyfGVufDF8fHx8MTc2MDA5NDA4NHww&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          id: "burger-sep-2025",
          name: "La Triple Cheese",
          month: "Septiembre 2025",
          averageRating: 4.7,
          totalVotes: 289,
          imageUrl: "https://images.unsplash.com/photo-1703945530449-81f526495c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVlc2UlMjBidXJnZXIlMjBkZWxpY2lvdXN8ZW58MXx8fHwxNzYwMTM2MDk0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          id: "burger-aug-2025",
          name: "La Bacon Deluxe",
          month: "Agosto 2025",
          averageRating: 4.3,
          totalVotes: 315,
          imageUrl: "https://images.unsplash.com/photo-1598182198871-d3f4ab4fd181?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNvbiUyMGJ1cmdlcnxlbnwxfHx8fDE3NjAwNjY1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          id: "burger-jul-2025",
          name: "La Veggie Gourmet",
          month: "Julio 2025",
          averageRating: 4.1,
          totalVotes: 267,
          imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdnaWUlMjBidXJnZXJ8ZW58MXx8fHwxNzYwMDQ4MDA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
        {
          id: "burger-jun-2025",
          name: "La BBQ Smoky",
          month: "Junio 2025",
          averageRating: 4.6,
          totalVotes: 298,
          imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYnElMjBidXJnZXJ8ZW58MXx8fHwxNzYwMTM2MTM0fDA&ixlib=rb-4.1.0&q=80&w=1080",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const sortedRankings = [...rankings].sort((a, b) => b.averageRating - a.averageRating);
  const topBurger = sortedRankings[0];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= Math.round(rating)
                ? "fill-red-500 text-red-500"
                : "fill-transparent text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-950/50 border border-red-900/30 rounded-full mb-6">
            <Trophy className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-red-500 mb-2">¡Gracias por tu Valoración!</h2>
          <p className="text-gray-400 mb-4">
            Has valorado la hamburguesa del mes con {userRating} {userRating === 1 ? "estrella" : "estrellas"}
          </p>
          <p className="text-gray-500">
            Aquí está el ranking histórico de nuestras hamburguesas
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-zinc-900/50 border border-red-900/20 rounded-lg p-6">
                <div className="animate-pulse">
                  <div className="h-6 bg-zinc-800 rounded w-1/3 mb-4"></div>
                  <div className="h-4 bg-zinc-800 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Top Burger Highlight */}
            <div className="bg-gradient-to-br from-red-950/50 to-zinc-900/50 border-2 border-red-500/30 rounded-xl p-8 mb-8 shadow-xl shadow-red-900/20">
              <div className="flex items-center gap-4 mb-6">
                <Trophy className="w-10 h-10 text-red-500" />
                <div>
                  <h3 className="text-red-500">Hamburguesa Mejor Valorada</h3>
                  <p className="text-gray-400">De todos los tiempos</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={topBurger.imageUrl}
                  alt={topBurger.name}
                  className="w-32 h-32 rounded-xl object-cover border-2 border-red-500/30"
                />
                <div className="flex-1 text-center md:text-left">
                  <h4 className="text-gray-200 mb-2">{topBurger.name}</h4>
                  <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-400">{topBurger.month}</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    {renderStars(topBurger.averageRating)}
                    <span className="text-2xl text-red-500">
                      {topBurger.averageRating.toFixed(1)}
                    </span>
                    <span className="text-gray-500">
                      ({topBurger.totalVotes} valoraciones)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ranking List */}
            <div className="mb-8">
              <h3 className="text-gray-300 mb-6 text-center">Ranking Histórico</h3>
              <div className="space-y-4">
                {sortedRankings.map((burger, index) => (
                  <div
                    key={burger.id}
                    className={`bg-zinc-900/50 border rounded-lg p-6 transition-all hover:border-red-700/40 ${
                      index === 0
                        ? "border-red-500/50"
                        : "border-red-900/20"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                          index === 0
                            ? "bg-red-600 text-white"
                            : index === 1
                            ? "bg-red-800/50 text-red-300"
                            : index === 2
                            ? "bg-red-900/30 text-red-400"
                            : "bg-zinc-800 text-gray-500"
                        }`}>
                          <span className="text-lg">#{index + 1}</span>
                        </div>
                        <img
                          src={burger.imageUrl}
                          alt={burger.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="text-gray-200 mb-1">{burger.name}</h4>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <span className="text-gray-400">{burger.month}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center gap-2 ml-14 sm:ml-0">
                        <div className="flex items-center gap-2">
                          {renderStars(burger.averageRating)}
                          <span className="text-xl text-red-500">
                            {burger.averageRating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          {burger.totalVotes} valoraciones
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-8 border-t border-red-900/20">
              <p className="text-gray-500 mb-2">
                Vuelve el próximo mes para valorar nuestra nueva hamburguesa especial
              </p>
              <p className="text-gray-600">
                Cada mes, una nueva creación para que disfrutes y valores
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
