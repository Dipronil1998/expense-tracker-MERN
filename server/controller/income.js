const Income = require("../model/income");

exports.addIncome = async (req, res, next) => {
    try {
        const title = req.body.title;
        const date = req.body.date ? new Date(req.body.date).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0);
        const amount = req.body.amount;
        const category = req.body.category;
        const paymentMethod = req.body.paymentMethod;
        const paymentDepositsBank = req.body.paymentDepositsBank;
        const description = req.body.description;

        const newIncome = new Income({
            title,
            date,
            amount,
            category,
            paymentMethod,
            paymentDepositsBank,
            description,
        });
        await newIncome.save();
        res.status(201).json({ message: 'Income created successfully' });
    } catch (error) {
        next(error)
    }
}
