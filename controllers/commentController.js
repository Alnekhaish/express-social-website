const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const User = require('../models/userModel');

const index = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.userName });
    const comments = await Comment.find({ author: user._id })
      .populate('author')
      .populate({
        path: 'post',
        model: 'Post',
        populate: {
          path: 'author',
          model: 'User',
          select:
            'username profile.first_name profile.last_name profile.avatar',
        },
      });
    return res.json({
      message: 'Comments are retrieved successfully',
      comments: comments,
    });
  } catch (error) {
    return res.json(error);
  }
};

const ShowByPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    return res.json({
      message: 'Comments are retrieved successfully',
      comments: post.comments,
    });
  } catch (error) {
    return res.json(error);
  }
};

const create = async (req, res) => {
  try {
    const comment = new Comment({
      content: req.body.content,
      author: req.user._id,
      post: req.body.post,
    });
    await comment.save();

    const post = await Post.findById(req.body.post);
    post.comments.addToSet(comment._id);
    post.save();

    return res.json({ message: 'Comment is created successfully', comment });
  } catch (error) {
    return res.json(error);
  }
};

const show = async (req, res) => {
  try {
    const user = await User.find;
    const comment = await Comment.findById(req.params.commentId);
    return res.json({
      message: 'Comment details are retrieved successfully',
      comment,
    });
  } catch (error) {
    return res.json(error);
  }
};

const update = async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  comment.content = req.body.content;
  await comment.save();
  return res.json({
    message: 'Comment details are updated successfully',
    comment,
  });
};

const destroy = async (req, res) => {
  try {
    const comment = await Comment.deleteOne({ _id: req.params.commentId });
    return res.json({ message: 'Comment is deleted successfully', comment });
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { index, ShowByPost, create, show, update, destroy };
