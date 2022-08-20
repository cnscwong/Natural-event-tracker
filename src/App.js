import { useState, useEffect } from "react";
import Loader from "./components/Loader";
import Map from "./components/Map";
import Header from "./components/Header";

function App() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await fetch(
        "https://eonet.gsfc.nasa.gov/api/v3/events?status=open"
      );
      const { events } = await res.json();

      setEventData(events);
      setLoading(false);
    };

    fetchEvents();
  }, []);
  return (
    <div>
      <Header></Header>
      {!loading ? <Map eventData={eventData} /> : <Loader />}
    </div>
  );
}

export default App;
