const Order = require('../models/order');
const User = require('../models/user');
const Customer = require('../models/customer');
const uuidv1 = require('uuid/v1');
const { errMsg, sucMsg, ignoreParams } = require('../utils/showMsg');

// 新建订单
// deliveryUserId customerId
exports.addOrder = async ctx => {
  const { deliveryUserId, customerId, productCategory } = ctx.request.body;

  try {
    const newOrder = await Order.create({
      orderId: uuidv1(),
      deliveryUserId,
      customerId,
      productCategory,
    });
    ctx.body = sucMsg(newOrder, '新建订单成功');
  } catch (e) {
    ctx.body = errMsg(e);
  }
};

// 获取订单列表
// pageSize currentPage
exports.getList = async ctx => {
  // 获取get的参数，且这些参数都只能是 string
  const req = ctx.request.query;
  // 获取post的参数
  // const req = ctx.request.body;

  const pageSize = Number(req.pageSize);
  const currentPage = Number(req.currentPage);

  // createTime 倒序排
  let arr = await Order.find({}, ignoreParams()).sort({
    createdAt: -1,
  });

  const total = arr.length;

  arr = arr.slice(pageSize * (currentPage - 1), pageSize * currentPage);

  ctx.body = sucMsg({ arr, total });
};

// 删除订单
// orderId
exports.deleteOrder = async ctx => {
  const { orderId } = ctx.request.body;

  const res = await Order.deleteOne({ orderId });

  if (res.n === 1) {
    ctx.body = sucMsg('删除订单成功');
  } else {
    ctx.body = errMsg('删除订单失败');
  }
};

// 更新订单
// orderId
exports.updateOrder = async ctx => {
  const { orderId, ...others } = ctx.request.body;

  const res = await Order.updateOne(
    { orderId },
    {
      $set: others,
    },
  );

  if (res.n === 1) {
    ctx.body = sucMsg('更新订单成功');
  } else {
    ctx.body = errMsg('更新订单失败');
  }
};
