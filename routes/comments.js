/**
 * @swagger
 *   components:
 *     schemas:
 *       Comment:
 *         type: object
 *         required:
 *           - username
 *           - password
 *           - email
 *         properties:
 *           content:
 *             type: string
 *             description: content of comment
 *           author:
 *             type: string
 *             description: ID of the author
 *           post:
 *             type: string
 *             description: ID of post
 *         example:
 *           content: This is my first comment
 *           author: user ID
 *           post: post ID
 */

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: The posts mangaging API
 * /comments:
 *   post:
 *     summary: Create new comment by token
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The comment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Comment is created successfully
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *
 * /comments/{commentId}:
 *   get:
 *     summary: Get comment details by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The list of comment details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Comment details are retrieved successfully
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *   put:
 *     summary: Update comment details by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: The comment details are updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Comment details are updated successfully
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *   delete:
 *     summary: Delete the comment by ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The comment id
 *     responses:
 *       200:
 *         description: The comment is deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Comment is deleted successfully
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 */

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.post('/', commentController.create);

router.get('/:commentId', commentController.show);

router.put('/:commentId', commentController.update);

router.delete('/:commentId', commentController.destroy);

module.exports = router;
