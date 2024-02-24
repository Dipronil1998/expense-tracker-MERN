import React, { useState,useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import './App.css';
import { AddExpenseButton, AuthModal, ExpenseCards, ExpenseList } from "./components"
import { useAppContext } from './context/appContext';
import UnderConstructionMessage from './components/UnderConstructionMessage';

function App() {
  const { authModal, authorized } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(authModal);
  const [isOpenSite, setIsOpenSite] = useState(true);

  useEffect(() => {
    const currentDate = new Date();

    if (currentDate.getDate() === 1) {
      console.log('Site is not open on the 1st of the month');
      setIsOpenSite(false)
    } else {
      console.log('Site is open');
      setIsOpenSite(true)
    }
  }, [isOpenSite]);

  return (
    <>
    {isOpenSite? (<>
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
    </>) :(<UnderConstructionMessage/>)}
    </>
  );
}

export default App;
