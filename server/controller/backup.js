const { MongoClient } = require('mongodb');

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