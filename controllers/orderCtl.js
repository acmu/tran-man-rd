const Order = require('../models/order');
const uuidv1 = require('uuid/v1');
const { errMsg, sucMsg, ignoreParams } = require('../utils/showMsg');

// 新建订单
// deliveryUserId customerId
exports.addOrder = async ctx => {
  const { deliveryUserId, customerId } = ctx.request.body;

  try {
    const newOrder = await Order.create({
      orderId: uuidv1(),
      deliveryUserId,
      customerId,
    });
    ctx.body = sucMsg(newOrder, '新建订单成功');
  } catch (e) {
    ctx.body = errMsg(e);
  }
};

// 获取客户列表
// pageSize currentPage
exports.getList = async ctx => {
  // 获取get的参数，且这些参数都只能是 string
  const req = ctx.request.query;
  // 获取post的参数
  // const req = ctx.request.body;

  const pageSize = Number(req.pageSize);
  const currentPage = Number(req.currentPage);

  // createTime 倒序排
  let arr = await Customer.find({}, ignoreParams('updatedAt')).sort({
    createTime: -1,
  });

  const total = arr.length;

  arr = arr.slice(pageSize * (currentPage - 1), pageSize * currentPage);

  ctx.body = sucMsg({ arr, total });
};

// 删除客户
// customerId
exports.deleteCustomer = async ctx => {
  const { customerId } = ctx.request.body;

  const res = await Customer.deleteOne({ customerId });

  if (res.n === 1) {
    ctx.body = sucMsg('删除客户成功');
  } else {
    ctx.body = errMsg('删除客户失败');
  }
};

// 更新客户
// customerId
exports.updateCustomer = async ctx => {
  const { customerId, ...others } = ctx.request.body;

  const res = await Customer.updateOne(
    { customerId },
    {
      $set: others,
    },
  );

  if (res.n === 1) {
    ctx.body = sucMsg('更新客户成功');
  } else {
    ctx.body = errMsg('更新客户失败');
  }
};
