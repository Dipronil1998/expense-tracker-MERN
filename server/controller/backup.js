const { MongoClient } = require('mongodb');
const Bank = require("../model/bank");
const mongoUrl = process.env.mongoUrl;

const sourceDbName = process.env.sourceDbName;
const sourceCollectionName = process.env.sourceCollectionName;
const destinationDbName = process.env.destinationDbName;
const destinationCollectionName = process.env.destinationCollectionName;

exports.backupDB = async (req,res,next) =>{
    try {
        const sourceCollectionNameArray=sourceCollectionName.split(",");
        const destinationCollectionNameArray=destinationCollectionName.split(",");

        const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
        await client.connect();

        const sourceDb = client.db(sourceDbName);
        const destinationDb = client.db(destinationDbName);

        for (const collectionName of sourceCollectionNameArray) {
            
            const documents = await sourceDb.collection(collectionName).find().toArray();
            
            await destinationDb.collection(collectionName).deleteMany({});
        
            await destinationDb.collection(collectionName).insertMany(documents);
        }

        await client.close();

        res.status(200).json({ success: true, message: 'Data exported and imported successfully.' });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.updateAmountToZero = async (req,res,next) => {
    try {
        const currentDate = new Date();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

          if (currentDate.getDate() === firstDayOfMonth.getDate()) {
            await Bank.updateMany({}, { $set: { amount: 0 } });

            console.log('Amount updated to 0 for all documents on the first day of the month.');
            return res.status(200).json({message: "Amount updated to 0 for all documents on the first day of the month."})
          } else {
            console.log('Today is not the first day of the month. No update needed.');
           return res.status(200).json({message: 'Today is not the first day of the month. No update needed.'})
          }
    } catch (error) {
        next(error)
    } 
}