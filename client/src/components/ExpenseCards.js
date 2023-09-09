import React from 'react';
import { Button, Container, Row, Col, Card, Table, Modal } from 'react-bootstrap';

const ExpenseCards = ({ cards }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{cards.title}</Card.Title>
                <Card.Text>{cards.text}</Card.Text>
            </Card.Body>
        </Card>
    )
};

export default ExpenseCards;
