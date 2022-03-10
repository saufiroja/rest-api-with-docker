const { User } = require('./User.models');
const { Post } = require('./Post.models');

User.hasMany(Post, { foreignKey: 'userId' });

module.exports = { User, Post };
