/**
 * @swagger
 *   components:
 *     schemas:
 *       Post:
 *         type: object
 *         properties:
 *           content:
 *             type: string
 *             description: content of post
 *           author:
 *             readOnly: true
 *             type: string
 *             description: ID of the author
 *           likes:
 *             readOnly: true
 *             type: array
 *             description: array of IDs of user like the post
 *             items:
 *               type: string
 *               description: ID of user
 *           comments:
 *             type: array
 *             description: array of IDs for comments
 *             items:
 *               type: string
 *               description: ID for comment
 *         example:
 *           content: This is my first post
 *           author: user ID
 *           likes:
 *             - user ID
 *             - user ID
 *             - user ID
 *           comments:
 *             - user ID
 *             - user ID
 *             - user ID
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The posts mangaging API
 * /posts:
 *   post:
 *     summary: Create new post by token
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The post is created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Post is created successfully
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *
 * /posts/{postId}:
 *   get:
 *     summary: Get post details by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The list of post details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Post details are retrieved successfully
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *   put:
 *     summary: Update post details by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: The updated list of post details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Post details are updated successfully
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *
 *   delete:
 *     summary: Delete post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The post is deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Post is deleted successfully
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *
 * /posts/{postId}/like:
 *   post:
 *     summary: Like post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The list of comments for post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Comments are retrieved successfully
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *   delete:
 *     summary: Unlike post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The list of comments for post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Comments are retrieved successfully
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'


 *
 * /posts/{postId}/comments:
 *   get:
 *     summary: Get list of comments for post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     responses:
 *       200:
 *         description: The list of comments for post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Comments are retrieved successfully
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 */

const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.post('/', postController.create);

router.get('/:postId', postController.show);

router.put('/:postId', postController.update);

router.delete('/:postId', postController.destroy);

router.post('/:postId/like', postController.like);

router.delete('/:postId/like', postController.unlike);

router.get('/:postId/comments', commentController.ShowByPost);

module.exports = router;
