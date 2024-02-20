// frontend/src/event/EventDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [editEvent, setEditEvent] = useState({ name: '', info: '', state: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetail = async () => {
      const response = await fetch(`${API_BASE_URL}/event/get/${id}`);
      const data = await response.json();
      // listではなく通常のjsonオブジェクトとして取得する
      if (data) { // Ensure data is not undefined and has at least one item
        setEvent(data); 
        setEditEvent({ 
          name: data.name, 
          info: data.info, 
          state: data.state 
        });
      console.log(data);
      } else {
        console.error('Event data is undefined or empty');
        // Handle the case where data is undefined or empty
      }
    };

    fetchEventDetail();
  }, [id]);

  const saveEdit = async () => {
    // const eventerId = localStorage.getItem('account_id'); // account_idをローカルストレージから取得
    const eventer_id = localStorage.getItem('eventer_id');
    const updatedEvent = { 
      name: editEvent.name, 
      info: editEvent.info, 
      state: editEvent.state,
      id: event.id, // eventのidを追加
      eventer_id: eventer_id // eventer_idを追加
    };
    console.log(updatedEvent);
    const response = await fetch(`${API_BASE_URL}/event/update`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEvent)
    });
    const data = await response.json();
    console.log(data);
    setEvent(updatedEvent);
    navigate('/eventer/manage'); // Add this line to navigate
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>event detail</h1>
      <h2>イベントの表示、編集ができます。</h2>
      <label>
        Event Name:
        <input
          type="text"
          value={editEvent.name}
          onChange={(e) => setEditEvent({ ...editEvent, name: e.target.value })}
        />
      </label>
      <label>
        Event Info:
        <input
          type="text"
          value={editEvent.info}
          onChange={(e) => setEditEvent({ ...editEvent, info: e.target.value })}
        />
      </label>
      <label>
        Event State:
        <select
          value={editEvent.state}
          onChange={(e) => setEditEvent({ ...editEvent, state: e.target.value })}
        >
          <option value="draft">Draft</option>
          <option value="open">Open</option>
          <option value="close">Close</option>
        </select>
      </label>
      <button onClick={saveEdit}>保存</button>
    </div>
  );
};

export default EventDetail;