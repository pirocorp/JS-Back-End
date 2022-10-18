const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = '/https?:\/\/.+/i';

const courseSchema = new Schema({
    title: { 
        type: String, 
        required: true, 
        minlength: [4, 'Course title must be at least 4 characters long'] 
    },
    description: { 
        type: String, 
        required: true, 
        minlength: [20, 'Coures description must be at least 20 characters long'],
        maxLength: [50, 'Coures description must be at most 40 characters long']
    },
    imageUrl: { 
        type: String, 
        required: true, 
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Invalid URL'
    }},
    duration: { 
        type: String, 
        required: true, 
    },
    createdAt: { 
        type: String, 
        required: true
    },
    users: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    }
});

const collation = {
    locale: 'en',
    strength: 2
};

courseSchema.index({ title: 1}, collation);

const Course = model('Course', courseSchema);
Course.collation = collation;

module.exports = Course;