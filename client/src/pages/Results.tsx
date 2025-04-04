import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MovieRecommendation as MovieRecommendationType, Mood } from "@/lib/types";
import { ArrowLeft, Star, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

interface ResultsProps {
  selectedMood: Mood | null;
  selectedLanguage: string;
  minRating: number;
  contentType: string;
}

export default function Results({ selectedMood, selectedLanguage, minRating, contentType }: ResultsProps) {
  const [recommendation, setRecommendation] = useState<MovieRecommendationType | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!selectedMood) {
        throw new Error("No mood selected");
      }
      
      const response = await apiRequest("POST", "/api/recommendation", {
        mood: selectedMood.id,
        language: selectedLanguage,
        minRating: minRating,
        contentType: contentType
      });
      
      return response.json();
    },
    onSuccess: (data: MovieRecommendationType) => {
      setRecommendation(data);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to get movie recommendation",
        variant: "destructive"
      });
      setLocation("/");
    }
  });

  useEffect(() => {
    if (!selectedMood) {
      // Redirect back to home if no mood is selected
      setLocation("/");
      return;
    }
    
    // Automatically fetch recommendation when component mounts
    mutate();
  }, [selectedMood, mutate, setLocation]);

  const handleBackToHome = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          onClick={handleBackToHome}
          variant="ghost" 
          className="mb-8 text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Mood Selection
        </Button>
        
        {isPending ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <div className="w-20 h-20 border-4 border-t-transparent border-pink-600 rounded-full animate-spin mb-4"></div>
            <p className="text-xl font-['Poppins']">Finding your perfect {contentType === 'tv' ? 'TV show' : contentType === 'anime' ? 'anime' : 'movie'}...</p>
            <p className="text-gray-400 mt-2">Based on your {selectedMood?.description} mood</p>
          </div>
        ) : recommendation ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mr-4">
                <span className="text-2xl">{selectedMood?.emoji}</span>
              </div>
              <div>
                <h1 className="text-3xl font-['Poppins'] font-bold text-white">Your Perfect Match</h1>
                <p className="text-gray-300">Based on your {selectedMood?.description} mood</p>
              </div>
            </div>
            
            <Card className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 shadow-xl">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl md:text-4xl font-['Poppins'] font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                    {recommendation.title}
                  </h2>
                  <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-md text-sm font-bold flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    <span>IMDb: {recommendation.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-pink-600 bg-opacity-30 px-3 py-1 rounded-full text-sm">
                    {recommendation.language}
                  </span>
                  {recommendation.genres.map((genre, index) => (
                    <span 
                      key={index} 
                      className="bg-purple-600 bg-opacity-30 px-3 py-1 rounded-full text-sm font-['Poppins']"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 mb-6 border-l-4 border-pink-600">
                  <p className="text-lg text-gray-200 italic leading-relaxed">{recommendation.description}</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-900 bg-opacity-30 rounded-lg p-5">
                    <h3 className="flex items-center text-lg font-['Poppins'] font-semibold mb-3">
                      <Film className="h-5 w-5 mr-2 text-purple-500" />
                      Streaming Options
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.streamingOn.map((provider, index) => (
                        <span 
                          key={index}
                          className="bg-black bg-opacity-50 border border-gray-700 px-3 py-1 rounded text-sm font-['Poppins']"
                        >
                          {provider}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-900 bg-opacity-30 rounded-lg p-5">
                    <h3 className="text-lg font-['Poppins'] font-semibold mb-3 flex items-center">
                      <span className="text-2xl mr-2">{selectedMood?.emoji}</span>
                      Why This Matches Your Mood
                    </h3>
                    <p className="text-gray-300">
                      This {contentType === 'tv' ? 'TV show' : contentType === 'anime' ? 'anime' : 'film'} perfectly captures the {selectedMood?.description.toLowerCase()} 
                      feeling you're looking for right now.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={() => mutate()}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-['Poppins'] font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
              >
                Give Me Another {contentType === 'tv' ? 'TV Show' : contentType === 'anime' ? 'Anime' : 'Movie'}
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p>No recommendation available. Please return to the home page and try again.</p>
            <Button 
              onClick={handleBackToHome}
              className="mt-4"
            >
              Back to Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}