const router = require('express').Router();
const { Comment, User } = require('../../models');
const logginCheck = require('../../utils/auth');

// route is /api/comments/

// this creates a new comment based on what the user input and adds it to the database
router.post('/:id', logginCheck, async (req, res) => {

    // this takes the users input and creates a comment based on it
    try {

        // this gets the username of the current user and adds it to the comment's data
        const dbUser = await User.findByPk(req.session.user_id)
        const user = dbUser.get({ plain: true });
        const user_name = user.username

        const commentData = await Comment.create({
            content: req.body.content,
            post_id: req.params.id,
            user_id: req.session.user_id,
            poster_username: user_name
        });


        res.status(200).json(commentData);

        // catches any 400 errors
    } catch (err) {
        res.status(400).json(err);
    }
});


module.exports = router;