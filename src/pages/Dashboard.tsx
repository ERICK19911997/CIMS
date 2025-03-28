import { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { database } from "../lib/firebase"; // Ensure database is initialized
import { Card, Table } from "react-bootstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Client interface
interface Client {
  id?: string;
  name: string;
  service: string;
  email: string;
  address: string;
  phone: string;
  subscribed: string;
  due: string;
  status: string;
}

const Dashboard = () => {
  const [totalClients, setTotalClients] = useState(0);
  const [totalOverdueClients, setTotalOverdueClients] = useState(0);
  const [totalPendingClients, setTotalPendingClients] = useState(0);
  const [totalActiveClients, setTotalActiveClients] = useState(0);
  const [renewalData, setRenewalData] = useState<Client[]>([]); // Store Clients data
  const [showAll, setShowAll] = useState(false);
  const [showAllPending, setShowAllPending] = useState(false);

  // Filter pending clients for the table
  const renewalData1 = renewalData.filter((client) => {
    const status = client.status.toLowerCase().trim();
    return status === "pending" || status === "overdue";
  });

  // Determine displayed clients
  const displayedClients = showAll ? renewalData : renewalData.slice(0, 6);
  const displayedClients1 = showAllPending
    ? renewalData1
    : renewalData1.slice(0, 6);

  useEffect(() => {
    // Fetch data from Firebase Realtime Database
    const fetchData = async () => {
      try {
        const clientsRef = ref(database, "clients"); // Reference to "clients" node
        const snapshot = await get(clientsRef); // Fetch data

        if (snapshot.exists()) {
          const data = snapshot.val();
          let clients: Client[] = [];

          // Convert Firebase object into an array
          Object.keys(data).forEach((key) => {
            clients.push({
              id: key,
              name: data[key]?.name || "N/A",
              service: data[key]?.service || "N/A",
              email: data[key]?.email || "N/A",
              address: data[key]?.address || "N/A",
              phone: data[key]?.phone || "N/A",
              subscribed: data[key]?.subscribed || "N/A",
              due: data[key]?.due || "N/A",
              status: data[key]?.status || "N/A",
            });
          });

          setTotalClients(clients.length);
          setTotalPendingClients(
            clients.filter(
              (client) => client.status.toLowerCase().trim() === "pending"
            ).length
          );
          setTotalOverdueClients(
            clients.filter(
              (client) => client.status.toLowerCase().trim() === "overdue"
            ).length
          );
          setTotalActiveClients(
            clients.filter(
              (client) => client.status.toLowerCase().trim() === "active"
            ).length
          );

          setRenewalData(clients);
        } else {
          console.log("No clients found in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching data from Firebase:", error);
      }
    };

    fetchData();
  }, []);

  // Chart data
  const chartData = renewalData.map((client, i) => ({
    month: `Month ${i + 1}`,
    clients: i + 1,
  }));

  return (
    <div className="container mt-4">
      {/* Row for Cards */}
      <div className="row">
        <div className="col-md-4">
          <Card className="text-white bg-primary mb-3">
            <Card.Body>
              <Card.Title>Total Clients</Card.Title>
              <Card.Text className="display-4">{totalClients}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-2">
          <Card
            className="text-white mb-3"
            style={{ backgroundColor: "#28a745" }}
          >
            <Card.Body>
              <Card.Title>Active Clients</Card.Title>
              <Card.Text className="display-4">{totalActiveClients}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-2">
          <Card
            className="text-white mb-4"
            style={{ backgroundColor: "#FF0000" }}
          >
            <Card.Body>
              <Card.Title>Pending</Card.Title>
              <Card.Text className="display-4">{totalPendingClients}</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card
            className="text-white mb-4"
            style={{ backgroundColor: "#ffc107" }}
          >
            <Card.Body>
              <Card.Title>Overdue</Card.Title>
              <Card.Text className="display-4">{totalOverdueClients}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Table for Pending Clients */}
      <div className="row">
        <div className="col-md-6">
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pending & Upcoming Renewals</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Due Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedClients1
                    .filter(
                      (client) =>
                        client.status === "Pending" ||
                        client.status === "Overdue"
                    )
                    .map((client) => (
                      <tr key={client.id}>
                        <td>{client.name}</td>
                        <td>{client.due}</td>
                        <td>
                          <span
                            className={`badge ${
                              client.status === "Pending"
                                ? "bg-danger"
                                : client.status === "Overdue"
                                ? "bg-warning"
                                : "bg-secondary"
                            }`}
                          >
                            {client.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {renewalData1.length > 6 && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowAllPending(!showAllPending)}
                >
                  {showAllPending ? "Show Less" : "Show More"}
                </button>
              )}
            </Card.Body>
          </Card>
        </div>

        {/* Chart for Client Growth */}
        <div className="col-md-6">
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Client Growth</Card.Title>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="clients" fill="#007bff" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Table for All Clients */}
      <div className="row">
        <div className="col-12">
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>All Clients</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Address</th>
                    <th>Subscribed</th>
                    <th>Due</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedClients.map((client) => (
                    <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{client.email}</td>
                      <td>{client.phone}</td>
                      <td>{client.service}</td>
                      <td>{client.address}</td>
                      <td>{client.subscribed}</td>
                      <td>
                        <span
                          className={`badge ${
                            client.due.toLowerCase().trim() === "active"
                              ? "badge-success"
                              : client.due.toLowerCase().trim() === "pending"
                              ? "badge-danger"
                              : "badge-warning"
                          }`}
                        >
                          {client.due}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {renewalData.length > 6 && (
                <button
                  className="btn btn-primary"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
