import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import open from 'open';
import console from 'console';
import * as currentSession from './session/currentSession.json';
import * as credentials from '../../credentials.json';

const createOAuthClient = (credentials: any) => {
  const oauth2Client = new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0]
  );

  return oauth2Client;
};

const requestAuthorization = async (oauth2Client: OAuth2Client) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/youtube.readonly'],
  });

  console.log('Authorize this app by visiting this url: ', authUrl);
  await open(authUrl, { wait: true });
};

const createAuthorizedClient = async (
  oauth2Client: OAuth2Client,
  authCode: string
) => {
  const { tokens } = await oauth2Client.getToken(authCode);
  oauth2Client.setCredentials(tokens);

  return oauth2Client;
};

const googleAuth = {
  authenticate: async () => {
    try {
      const authCode = currentSession.token;
      const OAuthClient = createOAuthClient(credentials);
      requestAuthorization(OAuthClient);
      const authorizedClient = await createAuthorizedClient(
        OAuthClient,
        authCode
      );

      return authorizedClient;
    } catch (error) {
      console.error(error);
    }
  },
};

export { googleAuth };
