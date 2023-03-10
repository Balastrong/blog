import { YouTubeVideo } from "types/youtube";

const CHANNEL_ID = "UC-KqnO3ez7vF-kyIQ_22rdA";

export async function getVideos(amount: number = 6): Promise<YouTubeVideo[]> {
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.GATSBY_YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${amount}`
    );

    const data = await res.json();

    return data.items;
  } catch (error) {
    console.error(error);
  }

  return [];
}
