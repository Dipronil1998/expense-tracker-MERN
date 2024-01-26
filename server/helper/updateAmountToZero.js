const Bank = require("../model/bank");

exports.updateAmountToZero = async () => {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

          if (currentDate.getDate() === firstDayOfMonth.getDate()) {
            await Bank.updateMany({}, { $set: { amount: 0 } });

            console.log('Amount updated to 0 for all documents on the first day of the month.');
          } else {
            console.log('Today is not the first day of the month. No update needed.');
          }
    } catch (error) {
        console.error('Error updating amount:', error.message);
    } 
}