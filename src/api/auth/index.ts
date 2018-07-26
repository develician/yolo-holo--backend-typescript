import AuthRouter from 'koa-router';
import authCtrl from './authCtrl';

const auth = new AuthRouter();

auth.post('/register', authCtrl.register);
auth.post('/login', authCtrl.login);
auth.post('/logout', authCtrl.logout);
auth.get('/profile/:username', authCtrl.getProfile);
auth.patch('/', authCtrl.changePassword);

auth.post('/facebook', authCtrl.facebookAuth);

export default auth;
