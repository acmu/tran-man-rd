const User = require('../models/user');
const uuidv1 = require('uuid/v1');
const { errMsg, sucMsg, includeParams } = require('../utils/showMsg');

const getTest = async (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    msg: 'get 😎',
    data: ctx.request.query,
  };
};

const postTest = async (ctx, next) => {
  ctx.status = 200;
  ctx.body = {
    msg: 'post 😎',
    data: ctx.request.body,
  };
};

const getAllName = async ctx => {
  try {
    const arr = await User.find({ isAdmin: false }, includeParams('userId', 'account', 'userName'));
    ctx.body = sucMsg(arr);
  } catch (error) {
    console.log(error);
    ctx.body = errMsg();
  }
};

// 登录
// 请求参数 account password
const login = async (ctx, next) => {
  const req = ctx.request.body;

  const errBody = {
    code: 0,
    msg: '用户名或密码错误',
  };

  // 获取 user
  const user = await User.findOne({ account: req.account }, { _id: 0 });

  ctx.status = 200;

  if (!user) {
    ctx.body = errBody;
    return;
  }

  const match = req.password === user.password;
  if (match) {
    ctx.session.signedId = req.account;
    ctx.body = {
      code: 1,
      msg: '登陆成功',
      data: user,
    };
  } else {
    ctx.body = errBody;
  }
};

// 注册
// 请求参数 account password admin
const register = async (ctx, next) => {
  const req = ctx.request.body;

  const user = await User.findOne({
    account: req.account,
  });

  ctx.status = 200;
  if (user) {
    ctx.body = {
      code: 0,
      msg: '账号重复！',
    };
    return;
  }

  if (req.password !== req.password2) {
    ctx.body = errMsg('两次密码不相等');
    return;
  }

  // 插入新用户
  const userId = uuidv1();
  const newUser = await User.create({
    userId,
    userName: req.userName,
    account: req.account,
    password: req.password,
    isAdmin: req.admin ? true : false,
  });

  ctx.body = {
    code: 1,
    msg: '注册成功！',
    data: newUser,
  };
};

// 检查是否登陆过
const checkSigned = async ctx => {
  const str = ctx.session.signedId || '';
  const user = await User.findOne(
    {
      account: str,
    },
    {
      _id: 0,
      password: 0,
    },
  );
  if (str.length) {
    ctx.body = sucMsg(user);
  } else {
    ctx.body = errMsg('请登陆');
  }
};

// 退出登陆
const signOut = async ctx => {
  if (ctx.session.signedId.length === 0) {
    ctx.body = errMsg('您还没登陆');
    return;
  }
  ctx.session.signedId = '';
  ctx.body = sucMsg({}, '已退出登陆');
};

// 更新个人信息
// 请求参数 account email phone userName
const updateUserInfo = async (ctx, next) => {
  const req = ctx.request.body;

  // 获取用户的 userId
  const result = await User.updateOne(
    {
      account: req.account,
    },
    req,
  );

  ctx.status = 200;
  if (result.nModified == 1) {
    ctx.body = {
      code: 1,
      msg: '保存成功',
    };
  } else {
    ctx.body = {
      code: 0,
      msg: '保存失败',
    };
  }
};

// 获取单个user信息
const getOneUser = async ctx => {
  const { userId } = ctx.request.query;
  // 获取用户的 userId
  const result = await User.findOne({ userId });

  if (result) {
    ctx.body = sucMsg(result);
  } else {
    ctx.body = errMsg();
  }
};

module.exports = {
  getTest,
  postTest,
  login,
  register,
  updateUserInfo,
  checkSigned,
  signOut,
  getAllName,
  getOneUser,
};
