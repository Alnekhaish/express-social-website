const Post = require('../models/postModel');
const User = require('../models/userModel');

const index = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.userName });
    const posts = await Post.find({ author: user._id }).populate('author');
    return res.json({ message: 'Posts are reterieved successfully', posts });
  } catch (error) {
    return res.json(error);
  }
};

const create = async (req, res) => {
  try {
    const post = new Post({
      author: req.user._id,
      content: req.body.content,
    });
    await post.save();
    res.json({ message: 'Post is created successfully', post });
  } catch (error) {
    return res.json(error);
  }
};

const show = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    return res.json({
      message: 'Post details are retrieved successfully',
      post,
    });
  } catch (error) {
    return res.json(error);
  }
};

const update = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.content = req.body.content;
    await post.save();
    return res.json({ message: 'Post details are updated successfully', post });
  } catch (error) {
    return res.json(error);
  }
};

const destroy = async (req, res) => {
  try {
    const post = await Post.deleteOne({ _id: req.params.postId });
    res.json({ message: 'Post is deleted successfully', post });
  } catch (error) {
    return res.json(error);
  }
};

const like = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    post.likes.addToSet(req.user._id);
    await post.save();
    return res.json({ message: 'Post is liked successfully', post });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

const unlike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.likes.pull(req.user._id);
    post.save();
    return res.json({ message: 'Post is unliked successfully', post });
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { index, create, show, update, destroy, like, unlike };
