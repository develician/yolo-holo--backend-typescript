import Router from 'koa-router';
import detailPlanCtrl from './detailPlan.ctrl';

const detailPlan = new Router();

detailPlan.get('/:planId/:day', detailPlanCtrl.read);
detailPlan.post('/', detailPlanCtrl.create);
detailPlan.delete('/:id', detailPlanCtrl.checkObjectId, detailPlanCtrl.remove);
detailPlan.patch('/:id', detailPlanCtrl.checkObjectId, detailPlanCtrl.update);

export default detailPlan;
