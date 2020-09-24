import { Router, Request, Response } from 'express';
import { AuthController } from './controllers/AuthController';
import { PlaylistController } from './controllers/PlaylistController';

const routes = Router();

routes.get('/playlists/list', PlaylistController.list);
routes.get('/oauth2Callback', AuthController.authenticate);

export { routes };
