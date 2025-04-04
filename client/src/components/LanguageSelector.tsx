import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Japanese",
  "Korean",
  "Chinese",
  "Hindi",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Kannada",
  "Bengali",
  "Marathi",
  "Punjabi",
  "Gujarati",
  "Urdu",
  "Italian",
  "Portuguese"
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
}

export default function LanguageSelector({ selectedLanguage, setSelectedLanguage }: LanguageSelectorProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-['Poppins'] font-semibold mb-4 flex items-center">
        <span className="text-pink-600 mr-2"><Globe className="h-5 w-5" /></span>
        Select Language:
      </h2>
      <div className="relative w-full md:w-64">
        <Select 
          value={selectedLanguage} 
          onValueChange={setSelectedLanguage}
        >
          <SelectTrigger 
            className="w-full bg-gray-700 bg-opacity-50 border-2 border-gray-600 text-white rounded-lg p-3 focus:border-pink-600"
          >
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent className="max-h-60 overflow-y-auto bg-gray-800 text-white border border-gray-700">
            {languages.map((language) => (
              <SelectItem key={language} value={language} className="hover:bg-gray-700 focus:bg-gray-700">
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
