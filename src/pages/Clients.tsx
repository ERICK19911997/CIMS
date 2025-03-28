import React, { useEffect, useState } from "react";
import { Button, Table, Pagination } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { ref, onValue, database } from "../lib/firebase";
import { Client } from "../components/types";
import AddClientForm from "../components/AddClientForm";

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const clientRef = ref(database, "clients");

    onValue(clientRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const clientList: Client[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setClients(clientList);
      }
    });
  }, []);

  const totalPages = Math.ceil(clients.length / itemsPerPage);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-center">Client Information</h2>
        <Button variant="success" onClick={() => setShowModal(true)}>
          <PlusCircle className="me-1" /> Add Client
        </Button>
      </div>
      <AddClientForm show={showModal} handleClose={() => setShowModal(false)} />

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead className="table-dark text-center">
            <tr>
              <th>#</th>
              <th>Client Name</th>
              <th>Service</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Subscribed Date</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {clients
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((client, index) => (
                <tr key={client.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{client.name}</td>
                  <td>{client.service}</td>
                  <td>{client.email}</td>
                  <td>{client.address}</td>
                  <td>{client.phone}</td>
                  <td>{client.subscribed}</td>
                  <td>{client.due}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center">
        <Pagination>
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
};

export default Clients;
