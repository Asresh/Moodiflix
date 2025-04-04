import { useLocation } from "wouter";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";
import MoodSelector from "@/components/MoodSelector";
import LanguageSelector from "@/components/LanguageSelector";
import ContentTypeSelector from "@/components/ContentTypeSelector";
import { Mood } from "@/lib/types";
import { LightbulbIcon, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface HomeProps {
  selectedMood: Mood | null;
  setSelectedMood: (mood: Mood | null) => void;
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  contentType: string;
  setContentType: (contentType: string) => void;
}

export default function Home({ 
  selectedMood, 
  setSelectedMood, 
  selectedLanguage, 
  setSelectedLanguage,
  minRating,
  setMinRating,
  contentType,
  setContentType
}: HomeProps) {
  const [, setLocation] = useLocation();

  const handleFindMovie = () => {
    if (selectedMood) {
      setLocation("/results");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-indigo-950 to-purple-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-purple-600 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-600 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Header */}
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold font-['Poppins'] bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 mb-3">
            Moodiflix
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Your AI-powered movie recommender based on how you feel
          </p>
        </motion.header>

        {/* Instructions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 mb-10 border border-gray-700 shadow-xl">
            <h2 className="text-xl font-['Poppins'] font-semibold mb-3 flex items-center">
              <LightbulbIcon className="text-pink-600 mr-2 h-5 w-5" />
              How It Works:
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Select what type of content you're in the mood for: Movies, TV Shows, or Anime.</li>
              <li>Choose a mood that matches how you're feeling right now.</li>
              <li>Pick your preferred language from the dropdown menu.</li>
              <li>Set your minimum IMDb rating preference.</li>
              <li>Let our AI suggest the perfect entertainment for your mood!</li>
            </ol>
          </Card>
        </motion.div>

        {/* Selection Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gray-800/20 backdrop-blur-sm rounded-xl p-8 border border-gray-700 shadow-xl"
        >
          <h2 className="text-2xl font-['Poppins'] font-semibold mb-6">Tell us what you want to watch</h2>

          {/* Content Type Selector */}
          <div className="mb-8">
            <h3 className="text-lg font-['Poppins'] mb-3 text-gray-300">1. What are you in the mood for?</h3>
            <ContentTypeSelector selectedContentType={contentType} setSelectedContentType={setContentType} />
          </div>

          {/* Mood Selector */}
          <div className="mb-8">
            <h3 className="text-lg font-['Poppins'] mb-3 text-gray-300">2. How are you feeling?</h3>
            <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
          </div>

          {/* Language Selector */}
          <div className="mb-8">
            <h3 className="text-lg font-['Poppins'] mb-3 text-gray-300">3. Choose language:</h3>
            <LanguageSelector selectedLanguage={selectedLanguage} setSelectedLanguage={setSelectedLanguage} />
          </div>

          {/* IMDb Rating Slider */}
          <div className="mb-8">
            <h3 className="text-lg font-['Poppins'] mb-3 text-gray-300">4. Minimum IMDb rating:</h3>
            <div className="px-2">
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-yellow-400 mr-2" />
                <span className="font-medium text-xl">{minRating.toFixed(1)}</span>
                <span className="text-gray-400 ml-2">and above</span>
              </div>
              <Slider
                defaultValue={[minRating]}
                min={1}
                max={9.5}
                step={0.5}
                onValueChange={(value) => setMinRating(value[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>1.0</span>
                <span>5.0</span>
                <span>9.5</span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-10">
            <Button 
              onClick={handleFindMovie} 
              disabled={!selectedMood}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-['Poppins'] font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mx-auto text-lg"
            >
              <span>Find My Perfect {contentType === 'tv' ? 'TV Show' : contentType === 'anime' ? 'Anime' : 'Movie'}</span>
              <span className="ml-2 text-xl">🎬</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
