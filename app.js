const Koa = require('koa');
const config = require('./config');
const session = require('koa-session');

// https://www.npmjs.com/package/koa-bodyparser
const bodyParser = require('koa-bodyparser');

// https://github.com/Automattic/mongoose
const mongoose = require('mongoose');

// https://github.com/Automattic/mongoose/issues/6890
mongoose.set('useCreateIndex', true);

// 连接数据库
mongoose.connect(config.db, { useNewUrlParser: true }, err => {
  if (err) {
    console.error('Failed to connect to database');
  } else {
    console.log('Connecting database successfully');
  }
});

const app = new Koa();

app.use(bodyParser());

app.keys = ['some secret hurr xiomin'];
app.use(session(config.ses, app));

// 引入 router
const userRouter = require('./routes/userRouter');
const exampleRouter = require('./routes/exampleRouter');
const customerRouter = require('./routes/customerRouter');
const orderRouter = require('./routes/orderRouter');

// 使用 router
app.use(userRouter.routes()).use(userRouter.allowedMethods());
app.use(exampleRouter.routes()).use(exampleRouter.allowedMethods());
app.use(customerRouter.routes()).use(customerRouter.allowedMethods());
app.use(orderRouter.routes()).use(orderRouter.allowedMethods());

app.listen(config.port, () => {
  console.log(`server port in ${config.port} :)`);
});
