const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /https?:\/\/.+/i;

const courseSchema = new Schema({
    title: { 
        type: String, 
        minlength: [4, 'Course title must be at least 4 characters long'] 
    },
    description: { 
        type: String,  
        minlength: [20, 'Coures description must be at least 20 characters long'],
        maxLength: [50, 'Coures description must be at most 50 characters long']
    },
    imageUrl: { 
        type: String, 
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Invalid URL'
    }},
    duration: { 
        type: String, 
        required: [true, 'Duration is required'], 
    },
    createdAt: { 
        type: String, 
        required: true,
        default: () => new Date().toISOString().slice(0, 10)
    },
    users: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    usersCount: {
        type: Number,
        default: -1
    },
    owner: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    }
});

const collation = {
    locale: 'en',
    strength: 2
};

courseSchema.index({ title: 1}, collation);
courseSchema.pre('save', preSave);

const Course = model('Course', courseSchema);
Course.collation = collation;

module.exports = Course;

function preSave(next) {
    this.usersCount = this.users.length;
    
    next();
}