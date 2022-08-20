import { useMapEvents } from "react-leaflet";
import { useState, useEffect } from "react";

const LocationInfoBox = ({ info }) => {
  const [infoDisplay, setInfoDisplay] = useState(true);

  useMapEvents({
    click: () => {
      setInfoDisplay(false);
    },
  });

  useEffect(() => {
    setInfoDisplay(info.state);
  }, [info]);

  return infoDisplay ? (
    <div className="location-info">
      <h2>Event Location Info</h2>
      <ul>
        <li>
          ID: <strong>{info.id}</strong>
        </li>
        <li>
          TITLE: <strong>{info.title}</strong>
        </li>
        <li>
          LATITUDE: <strong>{info.lat}</strong>
        </li>
        <li>
          LONGITUDE: <strong>{info.lng}</strong>
        </li>
      </ul>
      <h5>Click on the map to close</h5>
    </div>
  ) : null;
};

export default LocationInfoBox;
