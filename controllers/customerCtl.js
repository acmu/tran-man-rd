const Customer = require('../models/customer');
const uuidv1 = require('uuid/v1');
const { errMsg, sucMsg } = require('../utils/showMsg');

// 新建客户
// name phone
exports.addCustomer = async ctx => {
  const { req } = ctx.body;

  const newCustomer = await Customer.create({
    customerId: uuidv1(),
    name: req.name,
    phone: req.phone,
  });

  const t = ctx.body;

  ctx.body = sucMsg(t);
};
