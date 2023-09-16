import React from 'react';
import { Container, Row, Col, Card, Table, Modal } from 'react-bootstrap';
import './App.css';
import { AddExpenseButton,ExpenseCards,ExpenseList } from "./components"


const cardStyle = {
  display: 'flex',
  flexDirection: 'column'
};

function App() {

  

  

  return (
    <>
      <Container style={cardStyle}>
        <Row>
          <ExpenseCards/>
        </Row>
        <AddExpenseButton/>
      </Container>
      <ExpenseList/>

    </>
  );
}

export default App;
