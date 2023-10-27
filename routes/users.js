const router = require('express').Router();

const { getCurrentUser, updateUserById } = require('../controllers/users');

const { validateUpdateUserById } = require('../middlewares/requestValidation');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', validateUpdateUserById, updateUserById);

module.exports = router;
