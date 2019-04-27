const Router = require('koa-router');
const router = new Router();
const customerCtl = require('../controllers/customerCtl');

// get
router.get('/api/customer/list', customerCtl.getList);
router.get('/api/customer/getname', customerCtl.getAllName);

// post
router.post('/api/customer/add', customerCtl.addCustomer);
router.post('/api/customer/delete', customerCtl.deleteCustomer);
router.post('/api/customer/update', customerCtl.updateCustomer);

module.exports = router;
