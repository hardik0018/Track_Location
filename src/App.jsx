import { useMemo, useState } from "react";
import Map from "./components/Map";
import { io } from "socket.io-client";
let socket;
function App() {
  const [AllUserLoacation, setAllUserLoacation] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  useEffect(() => {
    socket = io(import.meta.env.VITE_SERVER_HOST);
  }, []);

  useEffect(() => {
    socket.on("All-location", (data) => {
      setAllUserLoacation(data);
    });
  }, [latitude,longitude])
  

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
          console.log("error:-", error);
        }
      );
    }
  };
  return (
    <>
      {latitude && longitude && (
        <Map
          latitude={latitude}
          longitude={longitude}
          zoom={15}
          AllUser={AllUserLoacation}
        />
      )}
      {!latitude && !longitude && (
        <Map latitude={20.5937} longitude={78.9629} zoom={5} />
      )}

      <button
        style={{
          height: "50px",
          width: "100px",
          position: "absolute",
          bottom: "0px",
          zIndex: "50px",
        }}
        onClick={handleShareLocation}
      >
        Share Location
      </button>
    </>
  );
}

export default App;
