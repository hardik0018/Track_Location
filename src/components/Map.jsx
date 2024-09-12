import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { memo } from "react";

const Map = ({ latitude, longitude, zoom, AllUser }) => {
  return (
    <div>
      <MapContainer
        center={[latitude, longitude]}
        zoom={zoom}
        style={{ height: "300px", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {AllUser &&
          Object.keys(AllUser).map((item,index) => {
            return (
              <Marker
              key={index}
                position={[AllUser[item].latitude, AllUser[item].longitude]}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>
    </div>
  );
};

export default memo(Map);
