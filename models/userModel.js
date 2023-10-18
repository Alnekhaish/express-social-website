const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profile: {
      first_name: String,
      last_name: String,
      avatar: String,
      bio: String,
      followers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      following: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  },
  { timestamps: true },
);

userSchema.pre('save', function (next) {
  const salt = crypto.randomBytes(16).toString('hex');
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  const hash = crypto
    .pbkdf2Sync(user.password, salt, 1000, 64, 'sha512')
    .toString('hex');

  user.password = hash;
  user.salt = salt;

  next();
});

userSchema.methods.isValidPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');

  return this.password === hash;
};

module.exports = mongoose.model('User', userSchema);
