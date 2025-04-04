export interface Mood {
  id: string;
  emoji: string;
  description: string;
}

export interface MovieRecommendation {
  title: string;
  description: string;
  rating: string;
  language: string;
  genres: string[];
  streamingOn: string[];
}
