import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './App.css';
import { AddExpenseButton, AuthModal, ExpenseCards, ExpenseList } from "./components"
import { useAppContext } from './context/appContext';

function App() {
  const { authModal, authorized } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(authModal);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {authModal && <AuthModal open={isModalOpen} />}
      {!authModal && (
        <>
          <Container>
            <Row>
              <ExpenseCards />
            </Row>
            <AddExpenseButton />
          </Container>
          <ExpenseList />
        </>
      )}
    </>
  );
}

export default App;
