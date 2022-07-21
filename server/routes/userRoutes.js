const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { generateToken } = require('../utils');
const expressAsyncHandler = require('express-async-handler');
const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      // First param = plain text inputted in UI password, next is encrypted password
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user.id,
          name: user.name.at,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

module.exports = userRouter;
