const Router = require('koa-router');
const router = new Router();
const userCtl = require('../controllers/userCtl');

router.get('/api/test', userCtl.getTest);
router.get('/api/checksigned', userCtl.checkSigned);

router.post('/api/test', userCtl.postTest);
router.post('/api/signin', userCtl.login);
router.post('/api/register', userCtl.register);
router.post('/api/signout', userCtl.signOut);
router.post('/api/updateuser', userCtl.updateUserInfo);

module.exports = router;
