import jwt from 'jsonwebtoken';
import credentials from '../credentials';
import { AppError } from './error';

function auth(context) {
  let req;
  if (context.headers) {
    req = context;
  } else {
    req = context.req;
  }
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError({ msg: 'authorization failed', code: 1001 });
  }
  let token;
  const parts = authorization.split(' ');

  if (parts.length === 2) {
    const schema = parts[0];
    const tokenCredentials = parts[1];

    if (/^Bearer$/i.test(schema)) {
      token = tokenCredentials;
    } else {
      throw new AppError({
        msg: 'credentials_bad_scheme: Format is Authorization: Bearer [token]',
        code: 1002,
      });
    }
  }

  try {
    const user = jwt.verify(token, credentials.JWT_SCERET);
    return user;
  } catch (error) {
    console.log(error);
    throw new AppError({ msg: 'authorization failed', code: 1001 });
  }
}

function bypassAuth(req) {
  const { authorization } = req.headers;
  if (authorization) {
    let token;
    const parts = authorization.split(' ');

    if (parts.length === 2) {
      const schema = parts[0];
      const tokenCredentials = parts[1];

      if (/^Bearer$/i.test(schema)) {
        token = tokenCredentials;
      } else {
        console.error('credentials_bad_scheme: Format is Authorization: Bearer [token]');
      }
    }

    try {
      const user = jwt.verify(token, credentials.JWT_SCERET);
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export { auth, bypassAuth };
