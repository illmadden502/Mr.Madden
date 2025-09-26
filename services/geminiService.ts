import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedTitles, GeneratedPolls, GeneratedGames, GeneratedPost } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash";

export const generateTitlesAndDescription = async (game: string, keywords: string): Promise<GeneratedTitles> => {
  const prompt = `You are an expert Twitch and YouTube stream marketing assistant. Generate 5 catchy, SEO-friendly stream titles for a streamer playing "${game}". The desired vibe of the stream is "${keywords}". Also, generate one engaging, short stream description (max 200 characters) for the same stream.`;
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          titles: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of 5 catchy stream titles."
          },
          description: {
            type: Type.STRING,
            description: "A short stream description (max 200 characters)."
          },
        }
      },
    },
  });

  try {
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as GeneratedTitles;
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("Failed to parse AI response. Please try again.");
  }
};

export const generatePolls = async (game: string): Promise<GeneratedPolls> => {
  const prompt = `You are a creative assistant for a video game streamer. The streamer is playing "${game}". Generate 3 engaging and fun poll questions for their chat. For each question, provide 2 to 4 plausible or funny options.`;
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          polls: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              }
            }
          }
        }
      },
    },
  });

  try {
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as GeneratedPolls;
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("Failed to parse AI response. Please try again.");
  }
};

export const suggestGames = async (genres: string, playedGames: string): Promise<GeneratedGames> => {
  const prompt = `I am an Xbox streamer looking for a new game to play. My favorite genres are "${genres}", and I recently enjoyed playing "${playedGames}". Based on this, suggest 3 new games available on Xbox Game Pass or the Xbox store for me to stream. For each game, provide a one-sentence reason why it would make for great stream content.`;
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          games: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                reason: { type: Type.STRING }
              }
            }
          }
        }
      },
    },
  });

  try {
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as GeneratedGames;
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("Failed to parse AI response. Please try again.");
  }
};

export const craftSocialPost = async (game: string, highlights: string): Promise<GeneratedPost> => {
  const prompt = `You are a social media manager for a gaming streamer. Create a short, exciting social media post for Twitter/X to announce that the streamer just went live, or to share highlights after a stream. The game is "${game}". Key highlights or moments from the stream were: "${highlights}". The post should be engaging and encourage people to watch. Include a good set of relevant hashtags.`;
  
  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          post: {
            type: Type.STRING,
            description: "The main content of the social media post."
          },
          hashtags: {
            type: Type.STRING,
            description: "A string of relevant hashtags, space-separated."
          }
        }
      },
    },
  });

  try {
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as GeneratedPost;
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("Failed to parse AI response. Please try again.");
  }
};
