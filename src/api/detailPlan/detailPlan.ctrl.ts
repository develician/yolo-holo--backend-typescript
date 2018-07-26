import DetailPlan from 'models/detailPlan';
const { ObjectId } = require('mongoose').Types;

const checkObjectId = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
};
const read = async ctx => {
  const { planId, day } = ctx.params;

  try {
    let detailPlan = await DetailPlan.find({
      $and: [{ planId }, { day }],
    }).exec();

    if (!detailPlan) {
      ctx.status = 404;
      return;
    }

    ctx.body = detailPlan;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const create = async ctx => {
  //   const {
  //     planId,
  //     username,
  //     day,
  //     destName,
  //     latitude,
  //     longitude,
  //     placeId,
  //     todoList,
  //   } = ctx.request.body;

  try {
    const detailPlan = new DetailPlan(ctx.request.body);
    detailPlan.save();

    ctx.body = detailPlan;
    ctx.status = 201;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const remove = async ctx => {
  const { id } = ctx.params;

  try {
    await DetailPlan.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const update = async ctx => {
  const { id } = ctx.params;
  const { destName, latitude, longitude, placeId, todoList } = ctx.request.body;
  try {
    let detailPlan = await DetailPlan.findByIdAndUpdate(
      id,
      {
        destName,
        latitude,
        longitude,
        placeId,
        todoList,
      },
      { new: true }
    ).exec();

    ctx.body = detailPlan;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export default { checkObjectId, read, create, remove, update };
