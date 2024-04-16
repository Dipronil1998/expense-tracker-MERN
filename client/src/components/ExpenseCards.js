import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useAppContext } from '../context/appContext';
import ReminderComponent from './ReminderComponent';

const cardTitle = {
    fontSize: "20px",
    color: "#333"
}

const cardText = {
    fontSize: "16px",
    color: "#777",
}

const ExpenseCards = () => {
    const {cardData,reminders} = useAppContext();

    const chunkedCardData = [];
    for (let i = 0; i < cardData.length; i += 3) {
        chunkedCardData.push(cardData.slice(i, i + 3));
    }
    
    return (
        <div>
            <ReminderComponent reminders={reminders}/>
            {chunkedCardData.map((row, rowIndex) => (
                <Row key={rowIndex} className="mb-3">
                    {row.map((card, index) => (
                        <Col key={index} xs={12} sm={6} md={4} className="p-2">
                            <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title style={cardTitle}>{card.title}</Card.Title>
                                    <Card.Text style={cardText}>{card.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ))}
        </div>
    );
};

export default ExpenseCards;
