const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/', authController.api_get);
router.post('/register', authController.register_user_post);
router.post('/login', authController.login_user_post);
router.get('/checkToken', authController.checkToken);
router.get('/logout', authController.logout_user_get);

module.exports = router;
