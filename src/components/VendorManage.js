import React, { useState, useEffect } from 'react'; // Ensure React is imported
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config'; // Import API_BASE_URL from config

const VendorManage = () => {
  const [vendors, setVendors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const fetchVendors = async () => {
      const response = await fetch(`${API_BASE_URL}/vendor/get`);
      const data = await response.json();
      setVendors(data);
    };
    fetchVendors();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async () => {
    const response = await fetch(`${API_BASE_URL}/event/search?event_name=${searchQuery}`);
    const data = await response.json();
    setFilteredEvents(data);
  };

  return (
    <div>
      <h1>出店者利用画面</h1>
      <input
        type="text"
        placeholder="Search events"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {/* Display filtered events */}
      {Array.isArray(filteredEvents) && filteredEvents.length > 0 ? (
        <>
          <p>hit events</p>
          {filteredEvents.map((event) => (
            <div key={event.event_id}>
              <Link to={`/event/${event.event_id}`}>{event.event_name}</Link>
            </div>
          ))}
        </>
      ) : <p>No events found</p>}
      <h2>Go to Home</h2>
      <Link to="/home">Go to Home</Link>
    </div>
  );
};

export default VendorManage;
