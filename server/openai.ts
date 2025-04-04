import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

export async function generateMovieRecommendation(mood: string, language: string, minRating: number = 6.0, contentType: string = 'movie') {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: 
            `You are an entertainment recommendation AI that suggests ${contentType === 'tv' ? 'TV shows' : contentType === 'anime' ? 'anime' : 'movies'} based on user's mood and language preference. ` +
            `Provide detailed, accurate ${contentType === 'tv' ? 'TV show' : contentType === 'anime' ? 'anime' : 'movie'} recommendations with title, description, IMDb rating, genres, and streaming services. ` +
            "Only recommend content that meets or exceeds the user's minimum IMDb rating requirement. " +
            "For Indian languages like Hindi, Tamil, Telugu, Malayalam, Kannada, Bengali, Marathi, Punjabi, Gujarati, and Urdu, " +
            `be sure to recommend authentic ${contentType === 'tv' ? 'TV shows' : contentType === 'anime' ? 'anime' : 'movies'} in those languages from their respective industries. ` +
            `Only recommend real, existing ${contentType === 'tv' ? 'TV shows' : contentType === 'anime' ? 'anime' : 'movies'} and respond in JSON format.`
        },
        {
          role: "user",
          content: `Recommend a ${contentType === 'tv' ? 'TV show' : contentType === 'anime' ? 'anime' : 'movie'} that matches the mood "${mood}" in ${language} language with an IMDb rating of at least ${minRating} or higher. 
            If this is in an Indian language (Hindi, Tamil, Telugu, Malayalam, Kannada, Bengali, Marathi, Punjabi, Gujarati, or Urdu), 
            be sure to recommend authentic content from that specific language's industry.
            
            ${contentType === 'anime' ? 'If the language is not Japanese, recommend anime that has been dubbed or has subtitles in the requested language.' : ''}
            
            Include the following information in your response: 
            title, description, rating (IMDb rating out of 10), language, genres (an array of 2-3 genres), 
            and streamingOn (an array of 2-3 streaming platforms where this content might be available like Netflix, Amazon Prime, Disney+ Hotstar, SonyLIV, ZEE5, Crunchyroll, etc.).
            
            IMPORTANT: The rating must be ${minRating} or higher on IMDb. Do not include any image URLs in your response.`
        }
      ],
      response_format: { type: "json_object" },
    });

    // Handle the response and ensure content exists before parsing
    const content = response.choices[0]?.message?.content ?? '';
    if (!content) {
      throw new Error("No content received from OpenAI");
    }
    const result = JSON.parse(content);
    return result;
  } catch (error: any) {
    console.error(`Error generating ${contentType} recommendation:`, error.message);
    throw new Error(`Failed to generate ${contentType} recommendation: ${error.message}`);
  }
}
