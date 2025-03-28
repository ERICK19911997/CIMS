import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { database } from "../lib/firebase"; // Ensure Firebase is initialized
import { Card, Table, Button, Row, Col } from "react-bootstrap";

interface Report {
  totalClients: number;
  totalRevenue: number;
  serviceStatistics: { [service: string]: number };
  upcomingPayments: number;
}

const Reports: React.FC = () => {
  const [report, setReport] = useState<Report | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const subscriptionsRef = ref(database, "subscriptions");
        const paymentsRef = ref(database, "payments");
        const snapshotSubscriptions = await get(subscriptionsRef);
        const snapshotPayments = await get(paymentsRef);

        if (snapshotSubscriptions.exists() && snapshotPayments.exists()) {
          const subscriptionsData = snapshotSubscriptions.val();
          const paymentsData = snapshotPayments.val();

          // Calculate total clients and revenue
          const totalClients = Object.keys(subscriptionsData).length;
          let totalRevenue = 0;
          const serviceStatistics: { [service: string]: number } = {};

          Object.keys(paymentsData).forEach((paymentId) => {
            const payment = paymentsData[paymentId];
            totalRevenue += payment.amount;

            if (serviceStatistics[payment.service]) {
              serviceStatistics[payment.service] += payment.amount;
            } else {
              serviceStatistics[payment.service] = payment.amount;
            }
          });

          // Calculate upcoming payments (could be based on due date)
          const upcomingPayments = Object.keys(subscriptionsData).filter(
            (key) => {
              const subscription = subscriptionsData[key];
              const dueDate = new Date(subscription.dueDate);
              return dueDate > new Date();
            }
          ).length;

          setReport({
            totalClients,
            totalRevenue,
            serviceStatistics,
            upcomingPayments,
          });
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };

    fetchReportData();
  }, []);

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <Card>
        <Card.Body>
          <Card.Title>Business Reports</Card.Title>
          <Row>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Total Clients</Card.Title>
                  <p>{report.totalClients}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Total Revenue</Card.Title>
                  <p>{report.totalRevenue.toLocaleString()} TZS</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Service Usage Statistics</Card.Title>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Service</th>
                    <th>Revenue Generated (TZS)</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(report.serviceStatistics).map(
                    ([service, revenue]) => (
                      <tr key={service}>
                        <td>{service}</td>
                        <td>{revenue.toLocaleString()}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Card.Title>Upcoming Payments</Card.Title>
              <p>{report.upcomingPayments} upcoming payments</p>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Reports;
