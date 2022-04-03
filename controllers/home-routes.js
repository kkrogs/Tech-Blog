const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const logginCheck = require('../utils/auth');


// this is if there is a get request for the hame page. The user is then given the 'homepage' handlebars file
router.get('/', async (req, res) => {


    console.log(req.session.user_id);
    console.log("-----------------------");

    // this finds all of the posts that are in the database and populates the homepage with them
    try {
        const dbPostData = await Post.findAll({ include: { model: User } }, { plain: true })
        const posts = dbPostData.map((post) =>
            post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });

        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this gets the dashboard route and populates it with the users posts
router.get('/dashboard', logginCheck, async (req, res) => {

    // this finds all the posts that were created by the user. It then populates the dashboard page with them
    try {
        const dbPostData = await Post.findAll({ include: { model: User } } )


        const plainPosts = dbPostData.map((post) =>
            post.get({ plain: true }));

        console.log(plainPosts);

        const posts = plainPosts.filter(post => post.user_id == req.session.user_id)

        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn,
        });

        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this gives the user a rage where they are able to create posts
router.get('/create-post', logginCheck, async (req, res) => {

    // this renders the page for the user
    try {
        res.render('create-post', {
            loggedIn: req.session.loggedIn
        });

        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this gives the user a rage where they can edit a post by the id
router.get('/edit-post/:id', logginCheck, async (req, res) => {

    // this finds the post that the user wanted to edit and renders the edit page with that information
    try {
        const singePostData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        });

        const post = singePostData.get({ plain: true });

        res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn,
        });

        // catches any errors
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// this renders the login page for the user
router.get('/login', async (req, res) => {
    res.render('login');
});

// this renders the signup page for the user
router.get('/signup', async (req, res) => {
    res.render('signup');
});

// this checks to see if a user is logged in. if they are they are then logged out and sent to the homepage
router.get('/logout', (req, res) => {
    if (req.session.loggedIn) {

        req.session.destroy(() => {
            res.redirect('/');
            return;
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;