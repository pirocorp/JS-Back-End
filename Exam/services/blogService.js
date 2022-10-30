const Blog = require('../models/Blog');

async function getAll() {
    return Blog.find({}).lean();
};

async function getTop(count) {
    return await Blog
        .find({})
        .sort({date: -1})
        .limit(count)
        .lean();
};

async function getById(blogId) {
    return Blog.findById(blogId).lean();
};

async function getByIdRaw(blogId) {
    return Blog.findById(blogId);
};

async function getDetailsById(blogId) {
    return Blog
        .findById(blogId)
        .populate('owner')
        .populate('followers')
        .lean();
};

async function create(data, userId) {
    const blog = {
        title: data.title,
        image: data.image,
        content: data.content,
        category: data.category,
        date: Date.now(),
        owner: userId
    };

    return Blog.create(blog);
};

async function update(blog, data) {
    blog.title = data.title;
    blog.image = data.image;
    blog.content = data.content;
    blog.category = data.category;

    return await blog.save();
};

async function deleteById(blogId) {
    return Blog.findByIdAndDelete(blogId);
};

async function followBlog(blog, userId) {
    blog.followers.push(userId);

    return await blog.save();
};

async function userBlogs(userId) {
    const followedBlogs = await Blog.find({ followers: userId }).lean();
    const writtenBlogs = await Blog.find({ owner: userId }).lean();

    return {
        followedBlogs,
        writtenBlogs
    }
};

module.exports = {
    getAll,
    getTop,
    getById,
    getByIdRaw,
    getDetailsById,
    create,
    update,
    followBlog,
    deleteById,
    userBlogs
};