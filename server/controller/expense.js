const Expense = require("../model/expense")
const Income = require("../model/income")
const { validCategories } = require("../interface/dbEnum")
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

exports.viewExpenses = async (req, res, next) => {
    try {
        let query = {};
        let totalExpensesThisMonth = 0;
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

        if (req.query.categoryFilter) {
            query = {
                $and: [
                    query,
                    {
                        category: {
                            $in: JSON.parse(req.query.categoryFilter)
                        }
                    }
                ]
            };
        }
        const expenses = await Expense.find(query).sort({ date: -1 }).lean();
        const incomes = await Income.find(query).sort({ date: -1 }).lean();

        const responses = expenses.map((item) => ({ ...item, type: 'expenses' })).concat(incomes.map((item) => ({ ...item, type: 'incomes' })));
        
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
            totalExpensesThisMonth = totalExpensesThisMonth + totalValidCategorieExpensesMonthwise;
            const response = {
                title: `total ${validCategory} expenses this month`,
                text: totalValidCategorieExpensesMonthwise
            };
            categoryValues.push(response);
        }

        const totalIncomes = await Income.aggregate([
            {
                $match: {
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

        const incomeResponse = {
            title: `total Income this month`,
            text: totalIncomes[0].totalAmount
        };
        categoryValues.push(incomeResponse);

        const remainingResponse = {
            title: `total Remaining this month`,
            text: totalIncomes[0].totalAmount - totalExpensesThisMonth
        };
        categoryValues.push(remainingResponse);

        res.status(200).json({ response: responses, cardResponse: categoryValues });
    } catch (error) {
        next(error);
    }
}


exports.deleteExpenses = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const expenses = await Expense.findOne({ _id: _id });
        if (expenses) {
            await Expense.deleteOne({ _id: _id });
            return res.status(200).json({ message: "Expenses delete successfully." });
        } else {
            return res.status(404).json({ message: "Expenses not found" });
        }
    } catch (error) {
        next(error);
    }
}

exports.viewExpensesById = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const expenses = await Expense.findOne({ _id: _id });
        if (expenses) {
            return res.status(200).json({ response: expenses });
        } else {
            return res.status(404).json({ message: "Expenses not found" });
        }
    } catch (error) {
        next(error);
    }
}

exports.updateExpenses = async (req, res, next) => {
    try {
      const _id = req.params.id;
  
      const title = req.body.title;
      const date = req.body.date ? new Date(req.body.date).setHours(0, 0, 0, 0) : new Date().setHours(0, 0, 0, 0);
      const amount = req.body.amount;
      const category = req.body.category;
      const paymentMethod = req.body.paymentMethod;
      const paymentBank = req.body.paymentBank;
      const description = req.body.description;
  
      const expenses = await Expense.findOne({ _id: _id });
  
      if (!expenses) {
        return res.status(404).json({ message: "Expenses not found." });
      }
  
      const updateExpense = await Expense.updateOne(
        { _id: _id },
        {
          title,
          date,
          amount,
          category,
          paymentMethod,
          paymentBank,
          description,
        }
      );
      if (updateExpense.modifiedCount > 0) {
        return res.status(200).json({ message: "Expenses updated successfully." });
      } else {
        return res.status(404).json({ message: "No changes made to expenses." });
      }
    } catch (error) {
      next(error);
    }
  };
  


