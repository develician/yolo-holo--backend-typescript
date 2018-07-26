import UserRouter from 'koa-router';
import userCtrl from './userCtrl';
const koaBody = require('koa-body');

const user = new UserRouter();

// auth.post('/register', authCtrl.register);
user.get('/profile/:username', userCtrl.profile);

// must check user auth
user.post(
  '/profile/:username',
  koaBody({ multipart: true }),
  userCtrl.changeProfileImage
);

export default user;
