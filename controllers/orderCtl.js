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
  let arr = await Order.find({}, ignoreParams())
    .sort({
      createdAt: -1,
    })
    .populate({
      path: 'user',
      select: 'userId userName',
    });

  // for (let i = 0; i < 3; i++) {
  //   const xio = await User.findOne({ userId: 'b03b3770-69c7-11e9-9f19-41d04b178e76' });
  //   console.log(xio);
  // }

  console.log(arr, 'arr');

  arr[0] = Object.assign({ uuuuuuuu: 123 }, arr[0]._doc);
  arr[1].userName = await User.findOne({ userId: arr[1].deliveryUserId });

  // for await (const val of arr) {
  //   val.userName = await User.findOne({ userId: val.deliveryUserId });
  //   val.name = await Customer.findOne({ customerId: val.customerId });
  //   // debugger;
  // }

  console.log(arr, 'arr');

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
