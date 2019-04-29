const Router = require('koa-router');
const router = new Router();
const orderCtl = require('../controllers/orderCtl');

// get
router.get('/api/order/list', orderCtl.getList);

// post
router.post('/api/order/add', orderCtl.addOrder);
router.post('/api/order/delete', orderCtl.deleteOrder);
router.post('/api/order/update', orderCtl.updateOrder);

module.exports = router;
