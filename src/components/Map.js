import { MapContainer, TileLayer } from "react-leaflet";
import Wildfire from "./Wildfire";
import Volcano from "./Volcano";
import SeaLakeIce from "./SeaLakeIce";

const Map = ({ eventData, center, zoom, key }) => {
  const wildfires = eventData.map((ev) => {
    if (ev.categories[0].id === 8) {
      let pos = [
        ev.geometries[0].coordinates[1],
        ev.geometries[0].coordinates[0],
      ];
      return <Wildfire position={pos} />;
    }
    return null;
  });

  const volcanoes = eventData.map((ev) => {
    if (ev.categories[0].id === 12) {
      let pos = [
        ev.geometries[0].coordinates[1],
        ev.geometries[0].coordinates[0],
      ];
      return <Volcano position={pos} />;
    }
    return null;
  });

  const seaLakeIce = eventData.map((ev) => {
    if (ev.categories[0].id === 15) {
      let pos = [
        ev.geometries[0].coordinates[1],
        ev.geometries[0].coordinates[0],
      ];
      return <SeaLakeIce position={pos} />;
    }
    return null;
  });

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        noWrap={true}
      />
      {wildfires}
      {volcanoes}
      {seaLakeIce}
    </MapContainer>
  );
};

Map.defaultProps = {
  center: [42.32, -122.8756],
  zoom: 4,
};

export default Map;
