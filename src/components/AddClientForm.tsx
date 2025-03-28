import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { database, ref, push } from "../lib/firebase";
import { Client } from "./types";

interface AddClientFormProps {
  show: boolean;
  handleClose: () => void;
}

const AddClientForm: React.FC<AddClientFormProps> = ({ show, handleClose }) => {
  const [formData, setFormData] = useState<Client>({
    name: "",
    service: "",
    email: "",
    address: "",
    phone: "",
    subscribed: "",
    due: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await push(ref(database, "clients"), formData);
      alert("Client added successfully!");
      setFormData({
        name: "",
        service: "",
        email: "",
        address: "",
        phone: "",
        subscribed: "",
        due: "",
      });
      handleClose();
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Client</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Service</Form.Label>
            <Form.Control
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Subscribed Date</Form.Label>
            <Form.Control
              type="date"
              name="subscribed"
              value={formData.subscribed}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="due"
              value={formData.due}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddClientForm;
