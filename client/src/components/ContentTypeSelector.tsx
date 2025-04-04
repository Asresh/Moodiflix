import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FilmIcon, TvIcon, BookIcon } from "lucide-react";

interface ContentTypeSelectorProps {
  selectedContentType: string;
  setSelectedContentType: (contentType: string) => void;
}

export default function ContentTypeSelector({ 
  selectedContentType, 
  setSelectedContentType 
}: ContentTypeSelectorProps) {
  
  const contentTypes = [
    {
      id: "movie",
      name: "Movies",
      icon: <FilmIcon className="h-5 w-5 mr-2" />,
      description: "Feature-length films"
    },
    {
      id: "tv",
      name: "TV Shows",
      icon: <TvIcon className="h-5 w-5 mr-2" />,
      description: "Series with multiple episodes"
    },
    {
      id: "anime",
      name: "Anime",
      icon: <BookIcon className="h-5 w-5 mr-2" />,
      description: "Japanese animation"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {contentTypes.map((type) => (
        <motion.div 
          key={type.id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            type="button"
            className={`
              w-full py-6 flex flex-col items-center justify-center rounded-lg text-center h-auto
              ${selectedContentType === type.id 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 border-transparent shadow-lg" 
                : "bg-gray-800/50 border-gray-700 hover:bg-gray-700/50"}
            `}
            onClick={() => setSelectedContentType(type.id)}
          >
            <div className="flex items-center mb-2">
              {type.icon}
              <span className="font-medium text-lg">{type.name}</span>
            </div>
            <span className="text-xs text-gray-300">{type.description}</span>
          </Button>
        </motion.div>
      ))}
    </div>
  );
}