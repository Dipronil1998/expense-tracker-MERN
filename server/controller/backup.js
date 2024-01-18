const { MongoClient } = require('mongodb');

const mongoUrl = process.env.mongoUrl;

const sourceDbName = process.env.sourceDbName;
const sourceCollectionName = process.env.sourceCollectionName;
const destinationDbName = process.env.destinationDbName;
const destinationCollectionName = process.env.destinationCollectionName;

exports.backupDB = async (req,res,next) =>{
    try {
        const client = new MongoClient(mongoUrl, { useUnifiedTopology: true });
        await client.connect();

        const sourceDb = client.db(sourceDbName);
        const destinationDb = client.db(destinationDbName);

        const documents = await sourceDb.collection(sourceCollectionName).find().toArray();

        await destinationDb.collection(destinationCollectionName).deleteMany({});
        
        await destinationDb.collection(destinationCollectionName).insertMany(documents);

        await client.close();

        res.status(200).json({ success: true, message: 'Data exported and imported successfully.' });
    } catch (error) {
        console.log(error);
        next(error);
    }
}