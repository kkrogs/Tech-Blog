const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const logginCheck = require('../../utils/auth');

// route is /api/posts/

// this gets a post and its comments comments. it then renders the single-post handlebars file with the information
router.get('/:id', logginCheck, async (req, res) => {

    // this gets the posts, its comments, and its user, and then renders the page based on the information
    try {
        const singePostData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        });
        const post = singePostData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn, },);

        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this adds a new post based on the users input
router.post('/', logginCheck, async (req, res) => {
    try {

        // this gets the username of the current user and adds it to the posts's data
        const dbUser = await User.findByPk(req.session.user_id)
        const user = dbUser.get({ plain: true });
        const user_name = user.username

        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
            post_username: user_name
        });

        res.status(200).json(postData);

        // catches any errors
    } catch (err) {
        res.status(400).json(err);
    }
});

// this changes a post by id and changes it based on the users information
router.put('/:id', logginCheck, async (req, res) => {

    // this checks the database for the specific post in question and updates it
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id
            },
            {
                where: {
                    id: req.params.id,
                },
            });

        // if there is no post there is a 404 error
        if (!postData) {
            res.status(404).json({ message: 'No post with this id!' });
            return;
        }
        res.status(200).json(postData);

        // catches any errors
    } catch (err) {
        res.status(500).json(err);
    }
});

// this deletes a post based on the id
router.delete('/:id', logginCheck, async (req, res) => {

    // this find the post with the id and destroys it
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        // if  there is no post, a 404 error is trown
        if (!postData) {
            res.status(404).json({ message: 'No post found with that id!' });
            return;
        }
        res.status(200).json(postData);

        // catches any errors
    } catch (err) {
        res.status(500).json(err);
    }
});




module.exports = router;