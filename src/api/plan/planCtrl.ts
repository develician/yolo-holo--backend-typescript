import Plan from 'models/plan';
const { ObjectId } = require('mongoose').Types;

const checkObjectId = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
};

const create = async ctx => {
  const {
    username,
    title,
    departDate,
    arriveDate,
    numberOfDays,
    selectedDateArray,
  } = ctx.request.body;

  const plan = new Plan({
    username,
    title,
    departDate,
    arriveDate,
    numberOfDays,
    selectedDateArray,
  });

  try {
    await plan.save();
    ctx.status = 201;
    ctx.body = plan;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const list = async ctx => {
  const { username } = ctx.params;

  try {
    let planList = await Plan.find({ username })
      .sort({ _id: -1 })
      .exec();
    ctx.body = planList;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const read = async ctx => {
  const { id } = ctx.params;

  try {
    let plan = await Plan.findById(id).exec();
    if (!plan) {
      ctx.status = 404;
      return;
    }
    ctx.body = plan;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const update = async ctx => {
  const { id } = ctx.params;

  try {
    let plan = await Plan.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!plan) {
      ctx.status = 404;
      return;
    }
    ctx.body = plan;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const remove = async ctx => {
  const { id } = ctx.params;

  try {
    let plan = await Plan.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export default { create, list, read, checkObjectId, update, remove };
