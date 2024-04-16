const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    reminderFrequency: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});


// eslint-disable-next-line
const Reminder = new mongoose.model('Reminder', reminderSchema);
module.exports = Reminder;
