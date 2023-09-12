import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../assets/css/ExpenseModal.css"
import { useAppContext } from '../context/appContext';

const initialState = {
  title: "",
  date: "",
  amount: "",
  category: "",
  paymentMethod: "",
  paymentBank: "",
  description: ""
}

const ExpenseModal = ({ show, handleClose }) => {
  const [values, setValues]= useState(initialState)
  const [errors, setErrors] = useState({});
  const { 
    isEditing,
    validCategories,
    validPaymentMethod,
    validPaymentBank,
    handelChange
  } = useAppContext();

  const handleInput = (e) => {
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: '' }));
    setValues({...values, [e.target.name]: e.target.value})
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
    if(values.paymentMethod === "Online"){
      if (!values.paymentBank) {
        newErrors.paymentBank = 'Payment Bank is required.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if (validateForm()) {
      if(isEditing){
        console.log("edit");
        return
      }
      console.log("add", values);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
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
              // value={title}
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
                // value={date}
                onChange={handleInput}
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
                  // value={amount}
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
                  // value={category}
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
                  // value={paymentMethod}
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
                // value={paymentBank}
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
            // value={description}
            onChange={handleInput}
            />
          </Form.Group>
          <div className="buttons-container">
            <Button variant="primary" type="submit" className="save-button" onClick={handleSubmit}>
              Save Expense
            </Button>
            <Button variant="secondary" onClick={handleClose} className="close-button">
              Close
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExpenseModal;
