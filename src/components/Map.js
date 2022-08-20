import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import Wildfire from "./Wildfire";
import Volcano from "./Volcano";
import SeaLakeIce from "./SeaLakeIce";
import { useState } from "react";
import LocationInfoBox from "./LocationInfoBox";

const Map = ({ eventData, center, zoom }) => {
  const [locationInfo, setLocationInfo] = useState(null);

  const wildfires = eventData.map((ev) => {
    if (ev.categories[0].id === "wildfires") {
      let pos = [ev.geometry[0].coordinates[1], ev.geometry[0].coordinates[0]];
      return (
        <Wildfire
          position={pos}
          onClick={() => {
            setLocationInfo({
              id: ev.id,
              title: ev.title,
              lng: ev.geometry[0].coordinates[1],
              lat: ev.geometry[0].coordinates[0],
              state: true,
            });
          }}
        />
      );
    }
    return null;
  });

  const seaLakeIce = eventData.map((ev) => {
    if (ev.categories[0].id === "seaLakeIce") {
      let pos = [ev.geometry[0].coordinates[1], ev.geometry[0].coordinates[0]];
      return (
        <SeaLakeIce
          position={pos}
          onClick={() => {
            setLocationInfo({
              id: ev.id,
              title: ev.title,
              lng: ev.geometry[0].coordinates[1],
              lat: ev.geometry[0].coordinates[0],
              state: true,
            });
          }}
        />
      );
    }
    return null;
  });

  const volcanoes = eventData.map((ev) => {
    if (ev.categories[0].id === "volcanoes") {
      let pos = [ev.geometry[0].coordinates[1], ev.geometry[0].coordinates[0]];
      return (
        <Volcano
          position={pos}
          onClick={() => {
            setLocationInfo({
              id: ev.id,
              title: ev.title,
              lng: ev.geometry[0].coordinates[1],
              lat: ev.geometry[0].coordinates[0],
              state: true,
            });
          }}
        />
      );
    }
    return null;
  });

  return (
    <div>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          noWrap={true}
        />
        <LayersControl position="topright">
          <LayersControl.Overlay checked name="Volcanoes">
            <LayerGroup>{volcanoes}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Wildfires">
            <LayerGroup>{wildfires}</LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name="Sea and Lake Ice">
            <LayerGroup>{seaLakeIce}</LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
        <ZoomControl position="topright" />
        {locationInfo && <LocationInfoBox info={locationInfo} />}
      </MapContainer>
    </div>
  );
};

Map.defaultProps = {
  center: [42.32, -122.8756],
  zoom: 4,
};

export default Map;
