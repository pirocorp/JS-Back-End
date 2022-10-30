const homeController = require('express').Router();
const blogService = require('../services/blogService');

const { paths } = require('../globalConstants');
const { hasUser } = require('../middlewares/guards');

homeController.get(paths.home.actions.home, async (req, res) => {
    const blogs = await blogService.getTop(3);

    res.render('home', {
        title: 'Home Page',
        user: req.user,
        blogs
    });
});

homeController.get(paths.home.actions.catalog, async (req, res) => {
    const blogs = await blogService.getAll();

    res.render('catalog', {
        title: 'Catalog Page',
        blogs
    });
});

homeController.get(paths.home.actions.profile, hasUser(), async (req, res) => {
    const userId = req.user._id.toString();
    const {
        followedBlogs,
        writtenBlogs
    } = await blogService.userBlogs(userId);

    const followedBlogsCount = followedBlogs.length;
    const writtenBlogsCount = writtenBlogs.length;

    res.render('profile', {
        title: 'Profile Page',
        followedBlogs,
        followedBlogsCount,
        writtenBlogs,        
        writtenBlogsCount
    });
});

module.exports = homeController;