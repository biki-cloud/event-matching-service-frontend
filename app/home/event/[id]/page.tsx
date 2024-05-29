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
      </Layout>
    </>
  );
};

export default EventDetail;

