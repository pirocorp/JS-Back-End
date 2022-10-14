const hotelController = require('express').Router();

const { paths } = require('../globalConstants');

hotelController.get(paths.hotelController.actions.details, (req, res) => {
    res.render('hotels/details', {
        title: 'Hotel Details'
    });
});

hotelController.get(paths.hotelController.actions.create, (req, res) => {
    res.render('hotels/create', {
        title: 'Create Hotel'
    });
});

hotelController.get(paths.hotelController.actions.edit, (req, res) => {
    res.render('hotels/edit', {
        title: 'Edit Hotel'
    });
});

module.exports = hotelController;