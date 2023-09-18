const mongoose = require('mongoose');
const {validIncomeCategories,
    validPaymentMethod,
    validPaymentBank} = require('../interface/dbEnum');

const incomeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    amount: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: validIncomeCategories
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: validPaymentMethod
    },
    paymentDepositsBank: {
        type: String,
        enum: validPaymentBank
    },
    description: {
        type: String,
    }
}, {
    timestamps: true,
});


// eslint-disable-next-line
const Income = new mongoose.model('Income', incomeSchema);
module.exports = Income;
