module.exports = (app) => {
    app.use((err, req, res, next) => {
        console.error(`>>> ${err.message}`);
        res.redirect('/');
    });
};