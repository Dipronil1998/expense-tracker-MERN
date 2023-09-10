import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../assets/css/ExpenseModal.css"

const ExpenseModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Expenses</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              // value={title}
              // onChange={handleChange}
              required
            />
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
                  // onChange={handleChange}
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group controlId="amount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  // value={amount}
                  // onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>
          </div>

          {/* Row 3: Category, Payment Method, and Payment Bank */}
          <div className="row">
            <div className="col">
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  // value={category}
                  // onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="stock">Stock</option>
                  <option value="mutual fund">Mutual Fund</option>
                  <option value="self">Self</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group controlId="paymentMethod">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  as="select"
                  name="paymentMethod"
                  // value={paymentMethod}
                  // onChange={handleChange}
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                </Form.Control>
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group controlId="paymentBank">
                <Form.Label>Payment Bank</Form.Label>
                <Form.Control
                  as="select"
                  name="paymentBank"
                // value={paymentBank}
                // onChange={handleChange}
                >
                  <option value="">Select Bank</option>
                  <option value="SBI">SBI</option>
                  <option value="ICICI">ICICI</option>
                </Form.Control>
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
            // onChange={handleChange}
            />
          </Form.Group>
          <div className="buttons-container">
            <Button variant="primary" type="submit" className="save-button">
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
