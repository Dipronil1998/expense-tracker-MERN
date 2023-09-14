const Expense = require("../model/expense")
exports.addExpenses = async (req, res, next) => {
    try {
        const title = req.body.title;
        const date = req.body.date ? new Date(req.body.date) : new Date().setHours(0, 0, 0, 0);
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
        if (req.query.from && req.query.to) {
            query.date = {
                $gte: new Date(req.query.from).setHours(0, 0, 0, 0),
                $lte: new Date(req.query.to).setHours(0, 0, 0, 0)
            };
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            query.date = {
                $gte: today,
                $lt: tomorrow
            };
        }

        console.log(query);
        const expenses = await Expense.find(query).sort({ date: 1 });

        res.status(200).json({ response: expenses });
    } catch (error) {
        next(error);
    }
}



