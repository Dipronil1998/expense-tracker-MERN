const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    bankName: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});


// eslint-disable-next-line
const Bank = new mongoose.model('Bank', bankSchema);
module.exports = Bank;
