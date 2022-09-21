import { useState } from "react";
import Navbar from "./Components/Navbar";
import MainContent from "./Components/MainContent";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Components/Home";
import { useGeolocated } from "react-geolocated";
import { createContext } from "react";
const Context = createContext();
function App() {
  const [WeatherData, setWeatherData] = useState()
  const [city, setCity] = useState();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated();
  return (
    <Context.Provider value={[WeatherData, setWeatherData, setCity, city]}>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home coords={coords} />} />
            <Route path="/weatherDetails/:lat/:lon" element={<MainContent />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Context.Provider>
  )
}

export default App
export { Context }