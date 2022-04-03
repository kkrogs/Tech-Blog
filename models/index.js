const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')

// this file determines the relationship between each model

// demonstrating the relationship between users and posts
User.hasMany(Post, {
    foreignKey: 'user_id',
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// demonstrating the relationship between comments and posts
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

// demonstrating the relationship between users and comments
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});
User.hasMany(Comment, {
    foreignKey: 'user_id',
});


module.exports = { User, Post, Comment };
