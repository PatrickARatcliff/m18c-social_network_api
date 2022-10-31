const router = require('express').Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:username
router.route('/:username').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:username/friends
router.route('/:username/friends').post(addFriend).delete(removeFriend);

module.exports = router;