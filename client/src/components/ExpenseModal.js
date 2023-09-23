import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../assets/css/ExpenseModal.css"
import { useAppContext } from '../context/appContext';
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import { format } from 'date-fns';

const initialState = {
  title: "",
  type: "Debits", 
  date: "",
  amount: "",
  category: "",
  paymentMethod: "",
  paymentBank: "",
  description: ""
}

const ExpenseModal = ({ show }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const {
    isEditing,
    toggleModal,
    validCategories,
    validIncomeCategories,
    validPaymentMethod,
    validType,
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
      setValues(expenses);
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
      } else {
        createExpenses(values);
        message.success('Expenses created successfully.');
      }
    }
  }

  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Expenses' : 'Add Expenses'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-8">
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={values.title}
                  onChange={handleInput}
                  required
                />
                <Form.Text className="text-danger">{errors.title}</Form.Text>
              </Form.Group>
            </div>
            <div className="col-4">
              <Form.Group controlId="type">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  as="select"
                  name="type"
                  value={values.type}
                  onChange={handleInput}
                  required
                >
                  <option value="Debits">Debits</option>
                  <option value="Credits">Credits</option>
                </Form.Control>
              </Form.Group>
            </div>
          </div>

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
                  max={format(new Date(), 'yyyy-MM-dd')}
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
                  value={values.amount}
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
                  value={values.category}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Category</option>
                  {values.type === 'Debits'
                    ? validCategories.map((itemValue, index) => (
                        <option key={index} value={itemValue}>
                          {itemValue}
                        </option>
                      ))
                    : validIncomeCategories.map((itemValue, index) => (
                        <option key={index} value={itemValue}>
                          {itemValue}
                        </option>
                      ))}
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
                  value={values.paymentMethod}
                  onChange={handleInput}
                  required
                >
                  <option value="">Select Payment Method</option>
                  {validPaymentMethod.map((itemValue, index) => (
                    <option key={index} value={itemValue}>
                      {itemValue}
                    </option>
                  ))}
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
                  value={values.paymentBank}
                  onChange={handleInput}
                >
                  <option value="">Select Bank</option>
                  {validPaymentBank.map((itemValue, index) => (
                    <option key={index} value={itemValue}>
                      {itemValue}
                    </option>
                  ))}
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
              value={values.description}
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
