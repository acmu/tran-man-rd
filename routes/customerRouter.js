const Router = require('koa-router');
const router = new Router();
const customerCtl = require('../controllers/customerCtl');

// get
router.get('/api/customer/list', customerCtl.getList);

// post
router.post('/api/customer/add', customerCtl.addCustomer);
router.post('/api/customer/delete', customerCtl.deleteCustomer);

module.exports = router;
