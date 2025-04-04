import { motion } from "framer-motion";
import { Mood } from "@/lib/types";
import { Film } from "lucide-react";

const moods: Mood[] = [
  { id: "funny", emoji: "😆", description: "Funny / Lighthearted" },
  { id: "emotional", emoji: "😢", description: "Emotional / Tearjerker" },
  { id: "thrilling", emoji: "😨", description: "Thrilling / Suspenseful" },
  { id: "romantic", emoji: "💘", description: "Romantic / Heartwarming" },
  { id: "mindBending", emoji: "🧠", description: "Mind-Bending / Thought-Provoking" },
  { id: "action", emoji: "😎", description: "Action-Packed / Exciting" },
  { id: "horror", emoji: "👻", description: "Spooky / Horror" }
];

interface MoodSelectorProps {
  selectedMood: Mood | null;
  setSelectedMood: (mood: Mood) => void;
}

export default function MoodSelector({ selectedMood, setSelectedMood }: MoodSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-['Poppins'] font-semibold mb-4 flex items-center">
        <span className="text-pink-600 mr-2"><Film className="h-5 w-5" /></span>
        Select Your Mood:
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4" id="moodContainer">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedMood(mood)}
            className={`bg-gray-700 bg-opacity-50 hover:bg-opacity-70 border-2 ${
              selectedMood?.id === mood.id
                ? "border-pink-600 shadow-lg shadow-pink-600/30"
                : "border-gray-600"
            } rounded-lg p-4 flex flex-col items-center justify-center transition-all`}
          >
            <span className="text-3xl mb-2">{mood.emoji}</span>
            <span className="font-['Poppins'] text-sm">{mood.description}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
