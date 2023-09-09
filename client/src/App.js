import React, { useState } from 'react';
import { Button, Container, Row, Col, Card, Table, Modal } from 'react-bootstrap';
import './App.css';

const buttonStyle = {
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  display: 'flex',
  flexDirection: 'row',
  marginRight: '9%',
};

const tableStyle = {
  padding: '5%'
};

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

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
      <Container style={{
        display: 'flex',
        flexDirection: 'column'
      }}>

        <Row>
          {cardData.map((card, index) => (
            <Col key={index} xs={12} sm={6} md={4} className="p-2">
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <Card.Text>{card.text}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <div style={buttonStyle}>
          <Button variant='primary' className='top-right-button' onClick={openModal}>
            Primary
          </Button>
        </div>
      </Container>

      <div className="parent-container">
        <div className="expense-card">
          <div className="expense-header">
            <h3>title</h3>
            <div className="expense-buttons">
              <button className="edit-button">Edit</button>
              <button className="delete-button">Delete</button>
            </div>
          </div>
          <p className="expense-details">
            <span className="expense-date">Date: 10/03/2021</span>
            <span className="expense-amount">Amount: $100</span>
          </p>
          <p className="expense-details">
          <span className="expense-description">Purpose: Lunch</span>
            <span className="expense-category">Category: Food</span>
          </p>
          
        </div>
      </div>




      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Content of your modal goes here.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          {/* Add additional buttons or actions here */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
