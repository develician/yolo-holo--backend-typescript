import PlanRouter from 'koa-router';
import planCtrl from './planCtrl';

const plan = new PlanRouter();

plan.post('/', planCtrl.create);
plan.get('/:username', planCtrl.list);
plan.get('/detail/:id', planCtrl.checkObjectId, planCtrl.read);
plan.patch('/:id', planCtrl.checkObjectId, planCtrl.update);
plan.delete('/:id', planCtrl.checkObjectId, planCtrl.remove);

export default plan;
