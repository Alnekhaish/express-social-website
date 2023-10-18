/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The Auth mangaging API
 * /signup:
 *   post:
 *     summary: Create new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: string
 *               password: string
 *               email: string
 *               firstName: string
 *               lastName: string
 *     responses:
 *       200:
 *         description: The user account is created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * /login:
 *   post:
 *     summary: Get access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: string
 *               password: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: [token]
 * /resetpassword:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: string
 *               password: string
 *     responses:
 *       200:
 *         description: Password is reset successfully
 *         content:
 *           application/json:
 *             scheme:
 *               $ref: '#/components/schemas/User'
 */

const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  },
);

router.post('/login', async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      } else if (!user) {
        return res.status(404).json(info);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, 'TOP_SECRET');

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.post('/resetpassword', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    user.password = req.body.password;
    await user.save();
    return res.json({ message: 'Password is reset successfully', user });
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
