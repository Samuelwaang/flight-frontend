import React, { useState } from "react";
import axios from "axios";
import FlightTable from "../components/FlightTable";

const Home: React.FC = () => {
  const [flightStart, setFlightStart] = useState("");
  const [flightDestination, setFlightDestination] = useState("");
  const [leaveDate, setLeaveDate] = useState("");
  const [returnDay, setReturnDay] = useState("");
  const [flights, setFlights] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://localhost:8081/flight/search", {
        params: {
          flightStart,
          flightDestination,
          leaveDate,
          returnDay,
        },
      });

      setFlights(response.data);
      setError(null);
      setIsSubmitted(true);
    } catch (error) {
      setError("An error occurred while fetching flights.");
      setIsSubmitted(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Flight Start:
            <input
              type="text"
              value={flightStart}
              onChange={(e) => setFlightStart(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Flight Destination:
            <input
              type="text"
              value={flightDestination}
              onChange={(e) => setFlightDestination(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Leave Date:
            <input
              type="date"
              value={leaveDate}
              onChange={(e) => setLeaveDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Return Day:
            <input
              type="date"
              value={returnDay}
              onChange={(e) => setReturnDay(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Search Flights</button>
      </form>

      {error && <p>{error}</p>}

      {isSubmitted && flights.length > 0 && (
        <div>
          <FlightTable flights={flights} />
        </div>
      )}
    </div>
  );
};

export default Home;
