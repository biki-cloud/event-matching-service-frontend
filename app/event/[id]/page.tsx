'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
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
        <Box sx={{ width: '100%', maxWidth: 500 }}>
          <Typography variant="h4">イベント詳細</Typography>
          <Typography variant="h6">name: {event.name}</Typography>
          <Button onClick={() => setEditing(!editing)} variant="contained">編集</Button>
          {editing && (
            <form onSubmit={handleEdit}>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
              <Button type='submit' variant="contained">Save</Button>
            </form>
          )}
        </Box>

      </Layout>
    </>
  );
};

export default EventDetail;

