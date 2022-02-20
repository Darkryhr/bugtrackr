import jwt, { JwtPayload } from 'jsonwebtoken';
const APP_SECRET = 'temp, move to env';

const getPayload = (token: string) => {
  const { userId } = jwt.verify(token, APP_SECRET) as JwtPayload;

  return userId;
};

export const getUser = (tokenHeader: string) => {
  //* if header exists, check validity
  if (tokenHeader) {
    const token = tokenHeader.replace('Bearer ', '');
    if (!token) throw new Error('No token found');
    const userId = getPayload(token);
    return userId;
  }
  //* no header, not logged in, can continue, but no access to context-restricted stuff
  return null;
};
