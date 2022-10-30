const blogService = require('../services/blogService');

module.exports = (isLean) => async (req, res, next) => {   
    const blogId = req.params.id;
    const blog = isLean 
        ? await blogService.getById(blogId)
        : await blogService.getByIdRaw(blogId);

    if(!blog){
        res.redirect('/404');
        return
    }

    res.locals.blog = blog;
    next();
};