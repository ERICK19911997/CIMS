import React, { useEffect, useState } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { database } from "../lib/firebase"; // Ensure Firebase is initialized
import { Card, Table, Button } from "react-bootstrap";

interface Payment {
  id?: string;
  clientName: string;
  amount: number;
  date: string;
  method: string;
}

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const paymentsRef = ref(database, "payments");
        const snapshot = await get(paymentsRef);

        if (snapshot.exists()) {
          const data = snapshot.val();
          const paymentsList: Payment[] = Object.keys(data).map((key) => ({
            id: key,
            clientName: data[key]?.clientName || "Unknown",
            amount: data[key]?.amount || 0,
            date: data[key]?.date || "N/A",
            method: data[key]?.method || "N/A",
          }));

          setPayments(paymentsList);
        } else {
          console.log("No payments found.");
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const displayedPayments = showAll ? payments : payments.slice(0, 6);

  return (
    <div className="container mt-4">
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>Payment Transactions</Card.Title>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Amount (TZS)</th>
                <th>Date</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {displayedPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.clientName}</td>
                  <td>{payment.amount.toLocaleString()}</td>
                  <td>{payment.date}</td>
                  <td>{payment.method}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {payments.length > 6 && (
            <Button variant="primary" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show More"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Payments;
