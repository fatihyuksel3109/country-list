import { useEffect, useState } from "react";
import Countries from "./components/CountryList";
import "./App.css";
import { GET_COUNTRIES } from "./utils/api";

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    GET_COUNTRIES
    .then((res) => res.json())
    .then((res) =>
      setCountries(res.data.countries)
    );
  }, []);
  return (
    <div className="App">
      <Countries countries={countries} />
    </div>
  );
}

export default App;
