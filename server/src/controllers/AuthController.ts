import { Request, Response } from 'express';
import { createSession } from '../core/Session/createSession';

const AuthController = {
  authenticate: async (request: Request, response: Response) => {
    try {
      const authCode = request.query.code;
      await createSession(authCode);
      return response.send(`<h1>Authorized</h1>`);
    } catch (error) {
      return response.status(500).json({ message: 'Internal server error' });
    }
  },
};

export { AuthController };
