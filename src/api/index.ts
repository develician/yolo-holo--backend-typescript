import Router from 'koa-router';
import auth from './auth';
import user from './user';
import plan from './plan';
import detailPlan from './detailPlan';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/user', user.routes());
api.use('/plan', plan.routes());
api.use('/detailPlan', detailPlan.routes());

export default api;
