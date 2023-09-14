import { useState, useEffect } from "react";
import axios from "axios";

const SchoolList = () => {
  const [search, setSearch] = useState("");
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://brainy-bee-sweatshirt.cyclic.app/schools?search=${search}`
      );
      console.log(response);
      setSchools(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>School List</h1>
      <input
        type="text"
        placeholder="Search by name or NPSN"
        value={search}
        onChange={handleSearchChange}
      />
      <ul>
        {schools.map((school) => (
          <li key={school.id}>
            {school.nama} - {school.npsn}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolList;
