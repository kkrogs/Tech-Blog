//requiring certain folders
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment')


// user hasmany posts, post belongs to user
User.hasMany(Post, {
    foreignKey: 'user_id',
});
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// comment belongs to post, post hasmany comment
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

// comment belongsto user. User hasmany comment
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});
User.hasMany(Comment, {
    foreignKey: 'user_id',
});


module.exports = { User, Post, Comment };
