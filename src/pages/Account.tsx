import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Flight {
  id: number;
  flightNumber: string;
  leaveDate: string;
  returnDate: string;
  startLocation: string;
  endLocation: string;
}

const AccountPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchUserFlights = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/flight/get-flights",
          {
            withCredentials: true,
          }
        );
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching user flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserFlights();
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h2>Your Flights</h2>
      {flights.length === 0 ? (
        <p>You have no saved flights.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Leave Date</th>
              <th>Return Date</th>
              <th>Start Location</th>
              <th>End Location</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.flightNumber}</td>
                <td>{flight.leaveDate}</td>
                <td>{flight.returnDate}</td>
                <td>{flight.startLocation}</td>
                <td>{flight.endLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AccountPage;
