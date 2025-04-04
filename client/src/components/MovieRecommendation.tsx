import { motion } from "framer-motion";
import { Film, RotateCcw, Star, Clapperboard } from "lucide-react";
import { MovieRecommendation, Mood } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MovieRecommendationProps {
  recommendation: MovieRecommendation;
  selectedMood: Mood;
  resetSelection: () => void;
}

export default function MovieRecommendationCard({ recommendation, selectedMood, resetSelection }: MovieRecommendationProps) {
  // Generate a background gradient based on the movie genres
  const getGenreGradient = () => {
    const genreColors: Record<string, string> = {
      'Action': 'from-red-600 to-orange-600',
      'Adventure': 'from-amber-500 to-yellow-500',
      'Comedy': 'from-yellow-400 to-lime-500',
      'Drama': 'from-indigo-600 to-violet-600',
      'Horror': 'from-purple-800 to-red-900',
      'Romance': 'from-pink-500 to-rose-400',
      'Thriller': 'from-slate-800 to-gray-700',
      'Fantasy': 'from-blue-500 to-cyan-400',
      'Sci-Fi': 'from-cyan-600 to-blue-600',
      'Mystery': 'from-violet-800 to-purple-600',
      'Crime': 'from-gray-800 to-gray-600',
      'Family': 'from-green-400 to-emerald-600',
      'Documentary': 'from-slate-600 to-slate-400',
      'Animation': 'from-pink-400 to-orange-400',
      'Biography': 'from-amber-700 to-amber-500',
      'History': 'from-stone-700 to-stone-500',
      'Music': 'from-violet-500 to-fuchsia-500',
      'War': 'from-neutral-700 to-stone-600',
      'Western': 'from-amber-800 to-yellow-700',
    };
    
    // Default gradient if no genres match
    let gradientClasses = 'from-pink-600 to-purple-600';
    
    // Try to find a matching genre
    for (const genre of recommendation.genres) {
      if (genreColors[genre]) {
        gradientClasses = genreColors[genre];
        break;
      }
    }
    
    return `bg-gradient-to-r ${gradientClasses}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-['Poppins'] font-semibold mb-4 flex items-center">
        <span className="text-pink-600 mr-2"><Film className="h-5 w-5" /></span>
        Your Movie Recommendation:
      </h2>
      
      <Card className="overflow-hidden border border-gray-700 bg-gray-800 bg-opacity-70 backdrop-blur-lg">
        <div className="flex flex-col">
          {/* Creative Movie Visual Header */}
          <div className={`relative p-8 ${getGenreGradient()}`}>
            <div className="absolute top-0 right-0 m-3 px-2 py-1 bg-black bg-opacity-50 rounded text-xs font-['Poppins'] font-semibold backdrop-blur-sm">
              <span>{recommendation.language}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Clapperboard className="h-8 w-8 text-white" />
                <h3 className="text-2xl md:text-3xl font-['Poppins'] font-bold text-white">{recommendation.title}</h3>
              </div>
              <div className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-sm font-bold flex items-center ml-4">
                <Star className="h-4 w-4 mr-1" />
                <span>IMDb: {recommendation.rating}</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {recommendation.genres.map((genre, index) => (
                <span 
                  key={index} 
                  className="bg-purple-600 bg-opacity-50 px-3 py-1 rounded-full text-xs font-['Poppins']"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            <div className="bg-gray-900 bg-opacity-40 rounded-lg p-4 mb-6 border-l-4 border-pink-600">
              <p className="text-gray-300">{recommendation.description}</p>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-['Poppins'] font-semibold text-gray-400 mb-1">Where to Watch:</h4>
              <div className="flex flex-wrap gap-2">
                {recommendation.streamingOn.map((provider, index) => (
                  <span 
                    key={index}
                    className="bg-black bg-opacity-50 border border-gray-700 px-3 py-1 rounded text-xs font-['Poppins']"
                  >
                    {provider}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="mt-4 rounded-lg p-4 bg-gray-700 bg-opacity-30">
              <h4 className="text-sm font-['Poppins'] font-semibold text-gray-400 mb-1">Matches Your Mood:</h4>
              <div className="flex items-center">
                <span className="text-2xl mr-2">{selectedMood.emoji}</span>
                <span className="text-white">{selectedMood.description}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="mt-6 text-center">
        <Button 
          onClick={resetSelection}
          variant="outline" 
          className="bg-transparent hover:bg-gray-700 border-2 border-pink-600 text-white font-['Poppins'] py-2 px-6 rounded-full transition-all hover:border-transparent"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Try Another Mood
        </Button>
      </div>
    </motion.div>
  );
}
