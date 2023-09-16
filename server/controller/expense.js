const Expense = require("../model/expense")
const {validCategories} = require("../interface/dbEnum")
exports.addExpenses = async (req, res, next) => {
    try {
        const title = req.body.title;
        const date = req.body.date ? new Date(req.body.date).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0);
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


// exports.viewExpenses = async (req, res, next) => {
//     try {
//         let query = {};
//         const cardResponse = [];
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

//         if (req.query.from && req.query.to) {
//             query.date = {
//                 $gte: new Date(req.query.from).setHours(0, 0, 0, 0),
//                 $lte: new Date(req.query.to).setHours(0, 0, 0, 0)
//             };
//         } else {
//             const tomorrow = new Date(today);
//             tomorrow.setDate(today.getDate() + 1);

//             query.date = {
//                 $gte: today,
//                 $lt: tomorrow
//             };
//         }

//         const expenses = await Expense.find(query).sort({ date: 1 });

//         const categoryValues = await Promise.all(validCategories.map(async (validCategory) => {
//             const validCategorieExpensesMonthwise = await Expense.aggregate([
//                 {
//                     $match: {
//                         category: validCategory,
//                         date: {
//                             $gte: firstDayOfMonth,
//                             $lte: today
//                         }
//                     }
//                 },
//                 {
//                     $group: {
//                         _id: null,
//                         totalAmount: { $sum: "$amount" }
//                     }
//                 }
//             ]);

//             const totalValidCategorieExpensesMonthwise = validCategorieExpensesMonthwise.length > 0
//                 ? validCategorieExpensesMonthwise[0].totalAmount
//                 : 0;

//             return {
//                 title: `total ${validCategory} investment this month`,
//                 text: totalValidCategorieExpensesMonthwise
//             };
//         }));
//         res.status(200).json({ response: expenses, cardResponse:categoryValues });
//     } catch (error) {
//         next(error);
//     }
// }

exports.viewExpenses = async (req, res, next) => {
    try {
        let query = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        if (req.query.from && req.query.to) {
            query.date = {
                $gte: new Date(req.query.from).setHours(0, 0, 0, 0),
                $lte: new Date(req.query.to).setHours(0, 0, 0, 0)
            };
        } else {
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            query.date = {
                $gte: today,
                $lt: tomorrow
            };
        }

        const expenses = await Expense.find(query).sort({ date: 1 });

        const categoryValues = [];

        for (const validCategory of validCategories) {
            const validCategorieExpensesMonthwise = await Expense.aggregate([
                {
                    $match: {
                        category: validCategory,
                        date: {
                            $gte: firstDayOfMonth,
                            $lte: today
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: "$amount" }
                    }
                }
            ]);

            const totalValidCategorieExpensesMonthwise = validCategorieExpensesMonthwise.length > 0
                ? validCategorieExpensesMonthwise[0].totalAmount
                : 0;

            const response = {
                title: `total ${validCategory} investment this month`,
                text: totalValidCategorieExpensesMonthwise
            };
            categoryValues.push(response);
        }

        res.status(200).json({ response: expenses, cardResponse: categoryValues });
    } catch (error) {
        next(error);
    }
}


exports.deleteExpenses = async (req,res,next)=>{
    try {
       const _id = req.params.id;
       const expenses = await Expense.findOne({_id:_id});
       if(expenses){
        await Expense.deleteOne({_id:_id});
        return res.status(200).json({ message: "Expenses delete successfully." });
       } else {
        return res.status(404).json({ message: "Expenses not found" });
       }
    } catch (error) {
        
    }
}


