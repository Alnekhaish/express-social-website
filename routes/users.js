/**
 * @swagger
 *   components:
 *     schemas:
 *       User:
 *         type: object
 *         properties:
 *           username:
 *             readOnly: true
 *             type: string
 *             description: username of user account
 *           password:
 *             type: string
 *             description: password for user account
 *           email:
 *             type: string
 *             description: email for user account
 *           profile:
 *             type: object
 *             description: object of profile
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               bio:
 *                 type: string
 *               following:
 *                 readOnly: true
 *                 type: array
 *               followers:
 *                 readOnly: true
 *                 type: array
 *         example:
 *           username: abdullah
 *           email: email@example.com
 *           profile:
 *             first_name: Fname
 *             last_name: Lname
 *             bio: bio
 *             following:
 *               - id
 *               - id
 *             followers:
 *               - id
 *               - id
 *
 *       Timeline:
 *         type: object
 *         properties:
 *           posts:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Post'
 *           comments:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Comment'
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users mangaging API
 * /users/details:
 *   get:
 *     summary: Get user details by token
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The list of user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: User data is reterieved successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *   put:
 *     summary: Update user details by token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The updated list of user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: User data is updated successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *
 *
 * /users/timeline:
 *   get:
 *     summary: Get timeline of user by token
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: The user timeline
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: User timeline is reterieved successfully
 *                 timeline:
 *                   $ref: '#/components/schemas/Timeline'

 *
 *
 * /users/follow:
 *   post:
 *     summary: Add user to following list by token and target username
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetUserName:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: The user is added to following list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: User is added to following list successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *
 *
 * /users/follow/{targetUserName}:
 *   delete:
 *     summary: Delete user from following list by token and target username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: targetUserName
 *         schema:
 *           type: string
 *         description: target user name
 *         required: true
 *     responses:
 *       200:
 *         description: The user is deleted from following list 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: User is removed from following list successfully
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *
 * /users/{userName}:
 *   get:
 *     summary: Get user details by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string
 *         description: username
 *         required: true
 *     responses:
 *       200:
 *         description: The list of user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: User data is reterieved successfully 
 *                 user:
 *                   $ref: '#/components/schemas/User'
 * /users/{userName}/posts:
 *   get:
 *     summary: Get user posts by username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userName
 *         schema:
 *           type: string
 *         required: true
 *         description: username
 *     responses:
 *       200:
 *         description: The list of user posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Post are reterieved successfully
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentsController = require('../controllers/commentController');

router.get('/details', userController.getUserData);

router.put('/details', userController.update);

router.get('/timeline', userController.timeline);

router.post('/follow', userController.follow);

router.delete('/follow/:targetUserName', userController.unfollow);

router.get('/:userName', userController.show);

router.get('/:userName/posts', postController.index);

router.get('/:userName/comments', commentsController.index);

module.exports = router;
