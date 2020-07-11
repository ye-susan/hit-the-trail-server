const { Router } = require('express');

const authController = require('../controllers/auth');
const auth = require('../middleware/auth');

const router = Router();

router.get('/', auth, authController.authenticateUser);
router.post('/', authController.signInUser);

module.exports = router;
