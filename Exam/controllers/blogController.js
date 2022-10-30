const blogController = require('express').Router();
const blogService = require('../services/blogService');

const preloader = require('../middlewares/blogPreloader');
const { paths, blogDetailsPath } = require('../globalConstants');
const { hasUser, isOwner } = require('../middlewares/guards');
const { parseError } = require('../utils/parsers');

blogController.get(paths.blog.actions.details, async (req, res) => {
    const blogId = req.params.id;
    const blog = await blogService.getDetailsById(blogId);
    const followers = blog.followers.map(f => f.username).join(', ');

    const hasUser = req.user != null;
    let isOwner = false;
    let canFollow = false;

    if (hasUser) {
        const userId = req.user._id.toString();
        isOwner = blog.owner._id.toString() == userId;
        canFollow = !isOwner && !blog.followers.some(x => x._id.toString() == userId);
    }

    res.render('blog/details', {
        blog,
        followers,
        hasUser,
        isOwner,
        canFollow
    });
});

blogController.get(paths.blog.actions.create, hasUser(), (req, res) => {
    res.render('blog/create', {
        title: 'Create Blog Page'
    });
});

blogController.post(paths.blog.actions.create, hasUser(), async (req, res) => {
    const data = req.body;
    const userId = req.user._id;

    try {
        await blogService.create(data, userId);
        res.redirect(paths.home.actions.catalog);
    } catch (error) {
        res.render('blog/create', {
            title: 'Create Blog Page',
            errors: parseError(error),
            blog: data
        });
    }    
});

blogController.get(paths.blog.actions.edit, preloader(true), isOwner(), (req, res) => {
    const blog = res.locals.blog;

    res.render('blog/edit', {
        title: 'Create Blog Page',
        blog
    });
});

blogController.post(paths.blog.actions.edit, preloader(), isOwner(), async (req, res) => {
    const blogId = req.params.id;
    const data = req.body;
    const blog = res.locals.blog;

    try {
        await blogService.update(blog, data);
        res.redirect(blogDetailsPath(blogId));
    } catch (error) {
        res.render('blog/edit', {
            title: 'Create Blog Page',
            blog: data,
            errors: parseError(error)
        });
    }
});

blogController.get(paths.blog.actions.delete, preloader(true), isOwner(), async (req, res) => {
    const blogId = req.params.id;

    await blogService.deleteById(blogId);
    res.redirect(paths.home.actions.catalog);
});

blogController.get(paths.blog.actions.follow, preloader(), hasUser(), async (req, res) => {
    const blog = res.locals.blog;

    const userId = req.user._id.toString();
    const isOwner = blog.owner._id.toString() == userId;
    const canFollow = !isOwner && !blog.followers.some(x => x._id.toString() == userId);

    if(canFollow) {
        await blogService.followBlog(blog, userId);
    }

    res.redirect(blogDetailsPath(blog._id.toString()));
});

module.exports = blogController;