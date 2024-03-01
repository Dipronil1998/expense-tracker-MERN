const Bank = require("../model/bank");

exports.updateAmountToZero = async (req,res,next) => {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

          if (currentDate.getDate() === firstDayOfMonth.getDate()) {
            await Bank.updateMany({}, { $set: { amount: 0 } });

            console.log('Amount updated to 0 for all documents on the first day of the month.');
            return res.status(200).json({messgae: "Amount updated to 0 for all documents on the first day of the month."})
          } else {
            console.log('Today is not the first day of the month. No update needed.');
           return res.status(200).json({message: 'Today is not the first day of the month. No update needed.'})
          }
    } catch (error) {
        next(error)
    } 
}