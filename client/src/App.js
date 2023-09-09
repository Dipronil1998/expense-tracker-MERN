import React, { useState } from 'react';
import { Button, Container, Row, Col, Card, Table, Modal } from 'react-bootstrap';
import './App.css';
import { Expense,AddExpenseButton,ExpenseCards,ExpenseList } from "./components"


const cardStyle = {
  display: 'flex',
  flexDirection: 'column'
};

function App() {

  const cardData = [
    { title: 'Card 1', text: 'Some text for Card 1' },
    { title: 'Card 2', text: 'Some text for Card 2' },
    { title: 'Card 3', text: 'Some text for Card 3' },
    { title: 'Card 4', text: 'Some text for Card 4' },
    { title: 'Card 5', text: 'Some text for Card 5' },
    { title: 'Card 6', text: 'Some text for Card 6' },
    { title: 'Card 7', text: 'Some text for Card 7' },
  ];

  

  return (
    <>
      <Container style={cardStyle}>
        <Row>
          {cardData.map((card, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="p-2">
              <ExpenseCards cards={card}/>
            </Col>
          ))}
        </Row>
        <AddExpenseButton/>
      </Container>
      <ExpenseList/>

    </>
  );
}

export default App;
