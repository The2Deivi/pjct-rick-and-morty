import { useEffect, useRef, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import getRandomNumber from "./services/getRandomNumber";
import LocationInfo from "./components/LocationInfo";
import ResidentCard from "./components/ResidentCard";

function App() {
  const [locationId, setLocationId] = useState(getRandomNumber(126));
  const url = `https://rickandmortyapi.com/api/location/${locationId}`;
  const [location, getLocation, hasError] = useFetch(url);

  useEffect(() => {
    getLocation();
  }, [locationId]);

  const inputId = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocationId(inputId.current.value.trim());
  };

  return (
    <div className="app">
      <div className="container">
        <img src="./img/fondo.png" alt="" className="image-one" />
        <img src="./img/fondo2.png" alt="" className="image-overlapping" />
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="form__input"
          ref={inputId}
          type="text"
          placeholder="Enter location number..."
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
        {hasError ? (
          <h2 className="card__error">❌Hey! It's only valid for numbers from 1 to 126.❌</h2>
        ) : (
          <>
            <LocationInfo location={location} />
            <div className="card__container">
              {location?.residents.map((url) => (
                <ResidentCard key={url} url={url} />
              ))}
            </div>
          </>
        )}
    </div>
  );
}

export default App;