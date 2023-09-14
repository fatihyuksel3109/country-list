import { useEffect, useState } from "react";

interface Props {
  countries: any[];
}

interface Country {
  name: string;
  capital: string;
  currency: string;
  phone: string;
  code: string;
}

const Countries = ({ countries }: Props) => {
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);

  const handleCountriesChange = (e: any) => {
    setSearch(e.target.value);
  };

  const handleGroupChange = (e: any) => {
    setGroup(e.target.value);
  };

  useEffect(() => {
    // Filter countries based on the search term
    const filteredBySearch = countries.filter((country: Country) =>
      country.name.toLowerCase().includes(search.toLowerCase())
    );

    // Filter countries based on the group size
    const filteredByGroup =
      group === null ? filteredBySearch : filteredBySearch.slice(0, group);

    setFilteredCountries(filteredByGroup);
  }, [search, group, countries]);

  const handleItemClick = (id: any) => {
    if (selectedCountry === id) {
      setSelectedCountry(null);
    } else {
      setSelectedCountry(id);
    }
  };

  useEffect(() => {
    let selectedCountryId = null;
    if (filteredCountries?.length > 10) {
      selectedCountryId = filteredCountries[9]?.phone;
    } else {
      selectedCountryId =
        filteredCountries[filteredCountries.length - 1]?.phone;
    }
    setSelectedCountry(selectedCountryId);
  }, [filteredCountries]);

  return (
    <div>
      <div style={styles.inputWrapper}>
        <div style={styles.inputContainer}>
          <label htmlFor="search">Search</label>
          <input
            id="search"
            placeholder="search countries"
            style={styles.input1}
            type="text"
            onChange={handleCountriesChange}
          />
        </div>
        <div style={styles.inputContainer}>
          <label htmlFor="group">Group</label>
          <input
            id="group"
            placeholder="group size"
            style={styles.input2}
            type="number"
            onChange={handleGroupChange}
          />
        </div>
      </div>
      <h2>There are {filteredCountries.length} countries totaly</h2>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column" as const,
        }}
      >
        {filteredCountries?.map((country: any) => {
          const isSelected = selectedCountry === country.phone;
          const bg = "#" + Math.floor(Math.random() * 16777215).toString(16);
          return (
            <div
              key={country.code}
              onClick={() => handleItemClick(country.phone)}
            >
              <div
                style={{
                  ...styles.card,
                  ...(isSelected
                    ? {
                        ...styles.active,
                        background: bg,
                      }
                    : {}),
                }}
              >
                <h1>{country.name}</h1>
                <h2>{country.capital}</h2>
                <h3>{country.currency}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  active: {
    color: "#fff",
  },
  inputWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "32px",
  },
  cardContainer: {
    display: "flex",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
  },
  input1: {
    width: "300px",
    height: "30px",
    border: "1px solid",
    marginTop: "32px",
    borderRadius: "16px 0px 0px 16px",
    padding: "16px",
  },
  input2: {
    width: "100px",
    height: "30px",
    border: "1px solid",
    marginTop: "32px",
    borderRadius: "0px 16px 16px 0px",
    padding: "16px",
  },
  card: {
    width: "400px",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    margin: 20,
    boxShadow: "0 3px 6px #00000029",
  },
};

export default Countries;
