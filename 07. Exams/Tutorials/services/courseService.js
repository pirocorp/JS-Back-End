const Course = require("../models/Course");

async function getTop() {
    return Course
        .find({})
        .sort({ usersCount: -1 })  
        .limit(3)      
        .lean();
}

async function getAll() {
    return Course
        .find({})
        .sort({ createdAt: 1 })        
        .lean();
};

async function getById(id) {
    return Course.findById(id).lean();
}

async function create(course) {
    return Course.create(course);
};

async function updateById(id, data) {
    const current = await Course.findById(id);

    current.title = data.title;
    current.description = data.description;
    current.imageUrl = data.imageUrl;
    current.duration = data.duration;

    return current.save();
};

async function deleteById(id) {
    return await Course.findByIdAndDelete(id);
};

async function enrollUser(courseId, userId) {
    const course = await Course.findById(courseId);
    course.users.push(userId);

    return course.save();
};

module.exports = {
    getAll,
    getTop,
    create,
    getById,
    deleteById,
    updateById,
    enrollUser
}