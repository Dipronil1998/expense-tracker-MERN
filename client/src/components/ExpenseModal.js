import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../assets/css/ExpenseModal.css"
import { useAppContext } from '../context/appContext';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import { format } from 'date-fns';

const initialState = {
  title: "",
  date: "",
  amount: "",
  category: "",
  paymentMethod: "",
  paymentBank: "",
  description: ""
}

const ExpenseModal = ({ show }) => {
  const navigate = useNavigate();
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({});
  const {
    isEditing,
    toggleModal,
    validCategories,
    validPaymentMethod,
    validPaymentBank,
    createExpenses,
    isExpensesCreate,
    expenses,
    updateExpenses,
  } = useAppContext();

  const closeModal = () => {
    setValues(initialState);
    toggleModal();
  };

  useEffect(() => {
    if (isEditing && expenses) {
      setValues(expenses); // Set values state with edited expense data
    }
  }, [isEditing, expenses]);

  const handleInput = (e) => {
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
    setValues({ ...values, [e.target.name]: e.target.value })
  };

  const validateForm = () => {
    const newErrors = {};
    if (!values.title) {
      newErrors.title = 'Title is required.';
    }
    if (!values.amount) {
      newErrors.amount = 'Amount is required.';
    } else if (isNaN(values.amount) || parseFloat(values.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number.';
    }
    if (!values.category) {
      newErrors.category = 'Category is required.';
    }
    if (!values.paymentMethod) {
      newErrors.paymentMethod = 'Payment Method is required.';
    }
    if (values.paymentMethod === "Online" && !values.paymentBank) {
      newErrors.paymentBank = 'Payment Bank is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditing) {
        updateExpenses(values);
        message.success('Expenses updated successfully.');
        return
      }
      createExpenses(values);
      message.success('Expenses created successfully.');
    }
  }

  useEffect(()=>{
    if(isExpensesCreate){
      navigate('/')
    }
  }, [isExpensesCreate])

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Expenses' : 'Add Expenses'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              // value={expenses?.title}
              value={values.title}
              onChange={handleInput}
              required
            />
            <Form.Text className="text-danger">{errors.title}</Form.Text>
          </Form.Group>

          <div className="row">
            <div className="col">
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  placeholder="yyyy-MM-dd"
                  pattern="\d{4}-\d{2}-\d{2}"
                  title="Please use the yyyy-MM-dd format"
                  value={values.date ? format(new Date(values.date), 'yyyy-MM-dd') : ''}
                  onChange={handleInput}
                  max={currentDate} 
                />
                <Form.Text className="text-danger">{errors.date}</Form.Text>
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={values?.amount}
                  onChange={handleInput}
                  required
                />
                <Form.Text className="text-danger">{errors.amount}</Form.Text>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={values?.category}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Category</option>
                  {
                    validCategories && validCategories.map((itemValue, index) => {
                      return (
                        <option key={index} value={itemValue}>{itemValue}</option>
                      )
                    })
                  }
                </Form.Control>
                <Form.Text className="text-danger">{errors.category}</Form.Text>
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group controlId="paymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  name="paymentMethod"
                  value={values?.paymentMethod}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Payment Method</option>
                  {
                    validPaymentMethod && validPaymentMethod.map((itemValue, index) => {
                      return (
                        <option key={index} value={itemValue}>{itemValue}</option>
                      )
                    })
                  }
                </Form.Control>
                <Form.Text className="text-danger">{errors.paymentMethod}</Form.Text>
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group controlId="paymentBank">
                <Form.Label>Payment Bank</Form.Label>
                <Form.Control
                  as="select"
                  name="paymentBank"
                  value={values?.paymentBank}
                  onChange={handleInput}
                >
                  <option value="">Select Bank</option>
                  {
                    validPaymentBank && validPaymentBank.map((itemValue, index) => {
                      return (
                        <option key={index} value={itemValue}>{itemValue}</option>
                      )
                    })
                  }
                </Form.Control>
                <Form.Text className="text-danger">{errors.paymentBank}</Form.Text>
              </Form.Group>
            </div>
          </div>

          {/* Row 4: Description */}
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={values?.description}
              onChange={handleInput}
            />
          </Form.Group>
          <div className="buttons-container">
            <Button variant="primary" type="submit" className="save-button" onClick={handleSubmit}>
            {isEditing ? 'Update' : 'Save'} Expenses
            </Button>
            <Button variant="secondary" onClick={closeModal} className="close-button">
              Close
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExpenseModal;
