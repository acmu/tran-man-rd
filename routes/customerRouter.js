const Router = require('koa-router');
const router = new Router();
const customerCtl = require('../controllers/customerCtl');

// get
// router.get('/api/customer/add', customerCtl.getTest);

// post
router.post('/api/customer/add', customerCtl);

module.exports = router;
