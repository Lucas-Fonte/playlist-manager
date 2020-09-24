import { Request, Response } from 'express';
import { googleAuth } from '../auth/googleAuth';
import { listVideos } from '../core/Playlist/listVideos';

import { youtube } from '../services/youtube';

const PlaylistController = {
  list: async (request: Request, response: Response) => {
    try {
      const { ...content } = await listVideos(googleAuth, youtube);
      return response.status(200).json({ ...content });
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  },
};

export { PlaylistController };
