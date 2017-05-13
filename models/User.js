const crypto = require('crypto');
const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const schemaOptions = {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret, options) {
      delete ret.password;
      delete ret.passwordResetToken;
      delete ret.passwordResetExpires;
    }
  },
};

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  gender: String,
  location: String,
  website: String,
  picture: String,
  facebook: String,
  twitter: String,
  google: String,
  github: String,
  vk: String,
  orgs: [{
    role: String,
    org: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Org',
      autopopulate: {
        select: 'name'
      }
    }
  }]
}, schemaOptions);

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    cb(err, isMatch);
  });
};

userSchema.virtual('gravatar').get(function() {
  if (!this.get('email')) {
    return 'https://gravatar.com/avatar/?s=200&d=retro';
  }
  const md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
});

// Helper library to autopopulate our organizations on the user.
userSchema.plugin(autopopulate);

const User = mongoose.model('User', userSchema);

module.exports = User;
