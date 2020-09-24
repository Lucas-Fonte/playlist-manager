import { PlaylistContent } from '../../services/youtube';
import { getResults } from './getResults';

interface AuthenticationClient {
  authenticate: () => Promise<any>;
}

interface VideoClient {
  getPlaylistContent: (authenticatedClient: any) => Promise<PlaylistContent>;
}

const listVideos = async (
  authenticationClient: AuthenticationClient,
  videoClient: VideoClient
) => {
  const authenticatedClient = await authenticationClient.authenticate();
  const {
    title,
    description,
    itemCount,
    videos,
  } = await videoClient.getPlaylistContent(authenticatedClient);
  const minutesWatched = getResults(videos);

  return {
    content: {
      title,
      description,
      itemCount,
      minutesWatched,
    },
  };
};

export { listVideos };
