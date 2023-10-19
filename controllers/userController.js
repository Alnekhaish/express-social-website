const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');

const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    return res.json({ message: 'User data is reterieved successfully', user });
  } catch (error) {
    return res.json(error);
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    for (let key in req.body) {
      if (req.body[key]) {
        if (key == 'profile') {
          for (let element in req.body[key]) {
            user.profile[element] = req.body[key][element];
          }
        } else {
          user[key] = req.body[key];
        }
      }
    }
    await user.save();
    return await res.json({
      message: 'User data is updated successfully',
      user,
    });
  } catch (error) {
    return res.json(error);
  }
};

const timeline = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const posts = await Post.find({
      author: { $in: [...user.profile.following, user._id] },
    }).populate(
      'author',
      'username profile profile.first_name profile.last_name profile.avatar',
    );
    const comments = await Comment.find({
      author: { $in: [...user.profile.following, user._id] },
    })
      .populate(
        'author',
        'username profile profile.first_name profile.last_name profile.avatar',
      )
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

    const typedPosts = posts.map((doc) => ({
      ...doc.toObject(),
      type: 'post',
    }));
    const typedComments = comments.map((doc) => ({
      ...doc.toObject(),
      type: 'comment',
    }));

    const mergedData = typedPosts.concat(typedComments);

    mergedData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    for (const index in mergedData) {
      if (mergedData[index].type === 'post') {
        for (const data of mergedData) {
          if (
            data.type === 'comment' &&
            data.post._id.toString() === mergedData[index]._id.toString()
          ) {
            mergedData.splice(index, 1);
          }
        }
      }
    }

    return res.json({
      message: 'User timeline is reterieved successfully',
      timeline: mergedData,
    });
  } catch (error) {
    return res.json(error);
  }
};

const follow = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const followedUser = await User.findOne({
      username: req.body.targetUserName,
    });

    user.profile.following.addToSet(followedUser._id);
    await user.save();

    followedUser.profile.followers.addToSet(user._id);
    await followedUser.save();

    return res.json({
      message: 'User is added to following list successfully',
      user,
    });
  } catch (error) {
    return res.json(error);
  }
};

const unfollow = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const followdUser = await User.findOne({
      username: req.params.targetUserName,
    });

    user.profile.following.pull(followdUser._id);
    await user.save();

    followdUser.profile.followers.pull(user._id);
    await followdUser.save();

    return res.json({
      message: 'User is removed from following list successfully',
      user,
    });
  } catch (error) {
    return res.json(error);
  }
};

const show = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.userName });
    return res.json({
      message: 'User data is reterieved successfully',
      user,
    });
  } catch (error) {
    return res.json(error);
  }
};

module.exports = { getUserData, update, timeline, follow, unfollow, show };
