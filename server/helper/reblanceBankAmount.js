const Bank = require("../model/bank");

exports.reblanceBankAmount = async (sourceBank,destinationBank, amount)=>{
    const sourceBankUpdate = await Bank.findOneAndUpdate(
        { bankName: sourceBank },
        { $inc: { amount: -amount } },
        { new: true,upsert: true }
    );

    const destinationBankUpdate = await Bank.findOneAndUpdate(
        { bankName: destinationBank },
        { $inc: { amount: amount } },
        { new: true,upsert: true }
    );

    return true; 
}