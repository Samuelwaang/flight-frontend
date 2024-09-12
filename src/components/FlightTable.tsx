import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Stop {
  id: number;
  location: string;
  time: number;
}

interface Flight {
  id: number;
  airline: string;
  time: number;
  price: number;
  link: string;
  flightStart: string;
  flightDestination: string;
  leaveTime: string;
  arrivalTime: string;
  leaveDate: string;
  returnDay: string;
  stops: Stop[];
  numStops: number;
  returnAirline: string;
  returnLeaveTime: string;
  returnArrivalTime: string;
  returnStops: Stop[];
  returnNumStops: number;
  returnTime: number;
}

interface FlightTableProps {
  flights: Flight[];
}

const FlightDetails: React.FC<{ flight: Flight }> = ({ flight }) => {
  return (
    <div>
      <p>
        <strong>Leave Time:</strong> {flight.leaveTime}
      </p>
      <p>
        <strong>Arrival Time:</strong> {flight.arrivalTime}
      </p>
      <p>
        <strong>Return Leave Time:</strong> {flight.returnLeaveTime}
      </p>
      <p>
        <strong>Return Arrival Time:</strong> {flight.returnArrivalTime}
      </p>
      <p>
        <strong>Number of Stops:</strong> {flight.numStops}
      </p>
      <p>
        <strong>Return Number of Stops:</strong> {flight.returnNumStops}
      </p>
      <p>
        <strong>Stops:</strong>
      </p>
      <ul>
        {flight.stops.map((stop) => (
          <li key={stop.id}>
            {stop.location} at {new Date(stop.time).toLocaleTimeString()}
          </li>
        ))}
      </ul>
      <p>
        <strong>Return Stops:</strong>
      </p>
      <ul>
        {flight.returnStops.map((stop) => (
          <li key={stop.id}>
            {stop.location} at {new Date(stop.time).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

const FlightTable: React.FC<FlightTableProps> = ({ flights }) => {
  const [expandedFlight, setExpandedFlight] = useState<number | null>(null);
  const navigate = useNavigate();

  const toggleDetails = (flightId: number) => {
    setExpandedFlight(expandedFlight === flightId ? null : flightId);
  };

  const saveFlight = async (flightId: number) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/flight/addFlightToUser/${flightId}`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        alert("Flight successfully saved for later!");
      } else {
        alert("Failed to save flight.");
      }

      if (response.status === 404) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      console.error("Error saving flight:", error);
      alert("An error occurred while saving the flight.");
    }
  };

  return (
    <div className="container mt-4">
      {flights.length > 0 ? (
        flights.map((flight) => (
          <div key={flight.id} className="card mb-3">
            <div className="row g-0">
              <div className="card-body d-flex flex-wrap align-items-center">
                <div className="col-md-2">
                  <p>
                    <strong>Start:</strong> {flight.flightStart}
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Destination:</strong> {flight.flightDestination}
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Leave Date:</strong> {flight.leaveDate}
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Return Day:</strong> {flight.returnDay}
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Price:</strong> ${flight.price.toFixed(2)}
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Airline:</strong> {flight.airline}
                  </p>
                </div>
                <div className="col-md-2">
                  <p>
                    <strong>Return Airline:</strong> {flight.returnAirline}
                  </p>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-info"
                    type="button"
                    onClick={() => toggleDetails(flight.id)}
                  >
                    {expandedFlight === flight.id
                      ? "Hide Details"
                      : "Show Details"}
                  </button>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={() => saveFlight(flight.id)}
                  >
                    Save for Later
                  </button>
                </div>
              </div>
              {expandedFlight === flight.id && (
                <div className="card-body">
                  <FlightDetails flight={flight} />
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div>No flights found</div>
      )}
    </div>
  );
};

export default FlightTable;
