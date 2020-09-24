import fs from 'fs';
import { promisify } from 'util';

const asyncWriteFile = promisify(fs.writeFile);

const createSession = async (authCode: any) => {
  await asyncWriteFile(
    'src/auth/session/currentSession.json',
    JSON.stringify({
      token: authCode,
    })
  );

  return {
    content: { authCode },
  };
};

export { createSession };
