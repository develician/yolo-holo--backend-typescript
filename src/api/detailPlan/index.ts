import Router from 'koa-router';
import detailPlanCtrl from './detailPlan.ctrl';

const detailPlan = new Router();

detailPlan.get('/:planId/:day', detailPlanCtrl.read);
detailPlan.post('/', detailPlanCtrl.create);
detailPlan.delete('/:id', detailPlanCtrl.checkObjectId, detailPlanCtrl.remove);
detailPlan.patch('/:id', detailPlanCtrl.checkObjectId, detailPlanCtrl.update);

detailPlan.get(
  '/todo/list/:id',
  detailPlanCtrl.checkObjectId,
  detailPlanCtrl.listTodo
);

detailPlan.get(
  '/todo/:id/:index',
  detailPlanCtrl.checkObjectId,
  detailPlanCtrl.readTodo
);

detailPlan.patch(
  '/todo/:id',
  detailPlanCtrl.checkObjectId,
  detailPlanCtrl.addTodo
);

detailPlan.patch(
  '/todo/edit/:id/:index',
  detailPlanCtrl.checkObjectId,
  detailPlanCtrl.editTodo
);

detailPlan.delete(
  '/todo/:id/:index',
  detailPlanCtrl.checkObjectId,
  detailPlanCtrl.removeTodo
);

export default detailPlan;
