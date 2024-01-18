const mongoose = require('mongoose');
const {validCategories,
    validPaymentMethod,
    validPaymentBank,
    validType,
    validIncomeCategories
} = require('../interface/dbEnum');

const expensesSchema = new mongoose.Schema({
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
        enum: validCategories.concat(validIncomeCategories)
    },
    paymentMethod: {
        type: String,
        enum: validPaymentMethod
    },
    paymentBank: {
        type: String,
        enum: validPaymentBank
    },
    type: {
        type: String,
        enum: validType
    },
    description: {
        type: String,
    },
    sourceBank: {
        type: String,
        enum: validPaymentBank
    },
    destinationBank: {
        type: String,
        enum: validPaymentBank
    }
}, {
    timestamps: true,
});


// eslint-disable-next-line
const Expenses = new mongoose.model('Expenses', expensesSchema);
module.exports = Expenses;
