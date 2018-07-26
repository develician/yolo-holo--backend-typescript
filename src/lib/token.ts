import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET;

const generateToken = (payload: any) => {
  return new Promise((resolve, reject) => {
    if (jwtSecret === undefined) {
      return;
    }
    jwt.sign(
      payload,
      jwtSecret,
      {
        expiresIn: '7d',
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
};

const decodeToken = (token: any): any => {
  if (jwtSecret === undefined) {
    return;
  }
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, (error, decoded) => {
      if (error) reject(error);
      resolve(decoded);
    });
  });
};

const jwtMiddleware = async (ctx, next) => {
  const token = ctx.cookies.get('access_token');
  if (!token) return next();
  try {
    const decoded = await decodeToken(token);
    if (decoded === undefined) {
      return;
    }
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const { _id, profile } = decoded;
      const freshToken = await generateToken({ _id, profile });
      ctx.cookies.set('access_token', freshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7days
        httpOnly: true,
      });
    }
    ctx.request.user = decoded;
  } catch (e) {
    ctx.request.user = null;
  }

  return next();
};

export { generateToken, jwtMiddleware };
