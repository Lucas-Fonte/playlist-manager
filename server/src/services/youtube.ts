import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export interface PlaylistContent {
  title: string;
  description: string;
  itemCount: string;
  videos: any[];
}
const youtube = {
  getPlaylistContent: async (
    oauth2Client: OAuth2Client | undefined
  ): Promise<PlaylistContent> => {
    const service = google.youtube('v3');

    const response: any = await service.playlists
      .list({
        auth: oauth2Client,
        part: ['snippet,contentDetails'],
        mine: true,
        maxResults: 25,
      })
      .catch((err) => console.error(err));

    const { data: playlistData } = response;
    const {
      items: [playlistItem],
    } = playlistData;

    const playlistId = playlistItem.id;

    const { data: playlistItems } = await service.playlistItems.list({
      auth: oauth2Client,
      part: ['snippet,contentDetails'],
      maxResults: playlistItem.contentDetails.itemCount,
      playlistId,
    });

    const { items: playlistVideos }: any = playlistItems;

    const videos = [];
    for (const { contentDetails } of playlistVideos) {
      const { data: videoData } = await service.videos.list({
        auth: oauth2Client,
        part: ['snippet,contentDetails'],
        id: contentDetails.videoId,
      });

      videos.push(videoData);
    }

    return {
      title: playlistItem.snippet.title,
      description: playlistItem.snippet.description,
      itemCount: playlistItem.contentDetails.itemCount,
      videos,
    };
  },
};

export { youtube };
