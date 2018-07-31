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

  const {
    planId,
    username,
    day,
    destName,
    googleMapEnabled,
    latitude,
    longitude,
    placeId,
  } = ctx.request.body;

  try {
    if (googleMapEnabled) {
      const detailPlan = new DetailPlan({
        planId,
        username,
        day,
        destName,
        latitude,
        longitude,
        placeId,
        googleMapEnabled,
      });
      detailPlan.save();

      ctx.body = detailPlan;
      ctx.status = 201;
    } else {
      const detailPlan = new DetailPlan({
        planId,
        username,
        day,
        destName,
        googleMapEnabled,
      });
      detailPlan.save();

      ctx.body = detailPlan;
      ctx.status = 201;
    }
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

const listTodo = async ctx => {
  const { id } = ctx.params;

  try {
    let detailPlan = await DetailPlan.findById(id).exec();
    if (!detailPlan) {
      ctx.status = 404;
      return;
    }

    let todoList = detailPlan.todoList;
    ctx.body = todoList;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const readTodo = async ctx => {
  const { id, index } = ctx.params;

  try {
    let detailPlan = await DetailPlan.findById(id).exec();
    if (!detailPlan) {
      ctx.status = 404;
      return;
    }

    let existingTodo = detailPlan.todoList;
    let willReadTodo = existingTodo[parseInt(index, 10)];

    ctx.body = {
      todo: willReadTodo,
    };
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const addTodo = async ctx => {
  const { id } = ctx.params;
  const { todo } = ctx.request.body;
  try {
    let detailPlan = await DetailPlan.findById(id).exec();
    if (!detailPlan) {
      ctx.status = 404;
      return;
    }

    let existingTodoList = detailPlan.todoList;
    existingTodoList.push(todo);

    let updatedDetailPlan = await DetailPlan.findByIdAndUpdate(
      id,
      {
        todoList: existingTodoList,
      },
      { new: true }
    ).exec();

    ctx.body = updatedDetailPlan;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const editTodo = async ctx => {
  const { id, index } = ctx.params;
  const { todo } = ctx.request.body;

  try {
    let detailPlan = await DetailPlan.findById(id).exec();
    if (!detailPlan) {
      ctx.status = 404;
      return;
    }

    let existingTodoList = detailPlan.todoList;
    existingTodoList[parseInt(index, 10)] = todo;

    detailPlan = await DetailPlan.findByIdAndUpdate(
      id,
      {
        todoList: existingTodoList,
      },
      { new: true }
    ).exec();

    ctx.body = detailPlan;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

const removeTodo = async ctx => {
  const { id, index } = ctx.params;

  try {
    let detailPlan = await DetailPlan.findById(id).exec();
    if (!detailPlan) {
      ctx.status = 404;
      return;
    }

    let existingTodo = detailPlan.todoList;
    existingTodo = existingTodo.filter((todo, i) => {
      return parseInt(index, 10) !== i;
    });

    detailPlan = await DetailPlan.findByIdAndUpdate(
      id,
      {
        todoList: existingTodo,
      },
      { new: true }
    ).exec();

    if (detailPlan === undefined || detailPlan === null) {
      ctx.status = 404;
      return;
    }
    ctx.body = detailPlan.todoList;
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};

export default {
  checkObjectId,
  read,
  create,
  remove,
  update,
  addTodo,
  removeTodo,
  editTodo,
  readTodo,
  listTodo,
};
