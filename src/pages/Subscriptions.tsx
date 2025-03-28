import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { database } from "../lib/firebase"; // Ensure Firebase is initialized
import { Card, Table, Button } from "react-bootstrap";

interface Client {
  id?: string;
  name: string;
  service: string;
  package: string;
  duration: string;
  due: string;
  subscribed: string;
}

const Subscriptions: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsRef = ref(database, "clients");
        const snapshot = await get(clientsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const subscribedClients: Client[] = Object.keys(data)
            .map((key) => ({
              id: key,
              name: data[key]?.name || "N/A",
              service: data[key]?.service || "N/A",
              package: data[key]?.service || "N/A",
              duration: data[key]?.duration || "N/A",
              due: data[key]?.due || "N/A",
              subscribed: data[key]?.subscribed || "No",
            }))
            .filter((client) => client.subscribed.toLowerCase() === "yes");

          setClients(subscribedClients);
        } else {
          console.log("No clients found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const displayedClients = showAll ? clients : clients.slice(0, 6);

  return (
    <div className="container mt-4">
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Subscribed Clients</Card.Title>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Service</th>
                <th>Package</th>
                <th>Duration</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {displayedClients.map((client) => (
                <tr key={client.id}>
                  <td>{client.name}</td>
                  <td>{client.service}</td>
                  <td>{client.package}</td>
                  <td>{client.duration}</td>
                  <td>{client.due}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {clients.length > 10 && (
            <Button variant="primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show More"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Subscriptions;
