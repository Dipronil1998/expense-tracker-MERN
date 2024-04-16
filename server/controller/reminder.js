const Reminder = require("../model/reminder");

exports.create = async (req, res, next)=>{
    try {
        const text = req.body.text; 
        const description = req.body.description; 
        const date = req.body.date; 
        const reminderFrequency = req.body.reminderFrequency; 

        const newReminder = new Reminder({
            text,
            date,
            description,
            reminderFrequency
        });
        const isSave = await newReminder.save();
        if(isSave){
            res.status(201).json({ message: 'Reminder created successfully' });
        } else{
            throw new Error('Failed to save reminder');
        }
    } catch (error) {
        next(error)
    }
}