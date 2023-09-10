const Expense = require("../model/expense")
exports.addExpenses = async (req, res, next) => {
    try {
        const title = req.body.title;
        const date = req.body.date ? new Date(req.body.date) : new Date();
        const amount = req.body.amount;
        const category = req.body.category;
        const paymentMethod = req.body.paymentMethod;
        const paymentBank = req.body.paymentBank;
        const description = req.body.description;

        const newExpense = new Expense({
            title,
            date,
            amount,
            category,
            paymentMethod,
            paymentBank,
            description,
        });
        await newExpense.save();
        res.status(201).json({ message: 'Expense created successfully' });
    } catch (error) {
        next(error)
    }
}

exports.viewExpenses = async (req, res, next) => {
    try {
        let query = {}; 
        const from = req.query.from;
        const to = req.query.to;
        if (from && to) {
            query.date = {
                $gte: new Date(from),
                $lte: new Date(to)
            };
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            query.date = { $gte: today };
        }

        const expenses = await Expense.find(query).sort({ date: 1 });

        res.status(200).json({ response: expenses });
    } catch (error) {
        next(error);
    }
}
