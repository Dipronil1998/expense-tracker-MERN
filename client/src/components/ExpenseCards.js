import React from 'react';
import { Button, Container, Row, Col, Card, Table, Modal } from 'react-bootstrap';
import { useAppContext } from '../context/appContext';

const cardTitle = {
    fontSize: "20px",
    color: "#333"
}

const cardText = {
    fontSize: "16px",
    color: "#777",
}

const ExpenseCards = () => {
    const {cardData} = useAppContext();

    const chunkedCardData = [];
    for (let i = 0; i < cardData.length; i += 3) {
        chunkedCardData.push(cardData.slice(i, i + 3));
    }

    return (
        <div>
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
