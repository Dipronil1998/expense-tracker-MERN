
import React from 'react';
import '../assets/css/ReminderComponent.css';

const ReminderComponent = ({ reminders }) => {
    console.log(reminders, "reminders");

    return (
        reminders.map((reminder, index) => (
            <div className="sticky-container" key={index}>
                <div className="sticky-content">
                    <h2>{reminder.text}</h2>
                    <p>{reminder.description}</p>
                </div>
            </div>
        ))
    );
};

export default ReminderComponent;
