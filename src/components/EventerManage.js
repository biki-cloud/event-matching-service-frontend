import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import { API_BASE_URL } from '../config'; // Import API_BASE_URL from config

const EventManage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventer_id = localStorage.getItem('eventer_id').replace('"', '').replace('"', '');
      console.log(eventer_id); 
      const response = await fetch(`${API_BASE_URL}/event/get_by_eventer_id/${eventer_id}`); // Use API_BASE_URL to construct API URL
      const data = await response.json();
      console.log(data);
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const filterEventsByState = (state) => {
    return events.filter(event => event.state === state);
  };

  return (
    <div>
      <h1>イベンター利用画面</h1>
      <h2>Draft Events</h2>
      {filterEventsByState('draft').map((event) => (
        <div key={event.id}>
          <Link to={`/event/${event.id}`}>{event.name}</Link>
        </div>
      ))}
      <h2>Open Events</h2>
      {filterEventsByState('open').map((event) => (
        <div key={event.id}>
          <Link to={`/event/${event.id}`}>{event.name}</Link>
        </div>
      ))}
      <h2>Close Events</h2>
      {filterEventsByState('close').map((event) => (
        <div key={event.id}>
          <Link to={`/event/${event.id}`}>{event.name}</Link>
        </div>
      ))}
      <h2>Rigister New Event</h2>
      <Link to="/event/register">Register New Event</Link>
      <h2>Go to Home</h2>
      <Link to="/home">Go to Home</Link>
      <h2>イベンター情報設定画面</h2>
      <Link to="/eventer/settings">イベンター情報設定画面</Link>
    </div>

  );
};

export default EventManage;

// /event/get_by_eventer_id/2a
// /event/get_event_by_eventer_id/2a5b7498-ae4f-41d9-a7f5-d3a3ec46fdb0