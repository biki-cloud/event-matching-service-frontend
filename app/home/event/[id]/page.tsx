'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import Layout from '../../Layout';

interface Event {
  id: number;
  name: string;
}

const EventDetail = ({ params }: { params: { id: string } }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const id = params.id;
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/events/${id}/`);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event', error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8001/api/events/${id}/`, {
        name: editName
      });
      setEvent(response.data);
      setEditing(false);
      console.log('Event updated successfully');
    } catch (error) {
      console.error('Failed to update event', error);
    }
  };

  if (!event) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Layout>
        <h1>イベント詳細</h1>
        <Box>
          <Typography variant="h4">{event.name}</Typography>
        </Box>
        <button onClick={() => setEditing(true)}>Edit</button>
        {editing && (
          <form onSubmit={handleEdit}>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />
            <button type="submit">Save</button>
          </form>
        )}
      </Layout>
    </>
  );
};

export default EventDetail;

