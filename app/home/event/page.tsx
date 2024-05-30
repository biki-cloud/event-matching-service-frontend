'use client'

import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from '../Layout';
import { Box, Button, Link, TextField, Typography } from '@mui/material';

type EventData = {
    id: number;
    name: string;
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const EventList = () => {
    const [eventName, setEventName] = useState<string>('');
    const [events, setEvents] = useState<Array<EventData>>([]);

    // イベントリストを取得する関数
    const fetchEvents = () => {
        axios.get('http://localhost:8001/api/events/')
            .then((res) => res.data)
            .then((data) => {
                setEvents(data);
                console.log('get events api called');
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
            });
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const createEvent = () => {
        axios.post('http://localhost:8001/api/events/', { name: eventName })
            .then((res) => res.data)
            .then(() => {
                console.log('create event api called');
                fetchEvents();  // イベントを作成した後に再度イベントリストを取得する
            })
            .catch((error) => {
                console.error('Error creating event:', error);
            });
            setEventName('');
    };

    return (
        <div>
            <Layout>
                <Box sx={{  width: '100%', maxWidth: 500 }}>
                    <Typography variant="h4" gutterBottom>
                        Create Event
                    </Typography>
                    <TextField id="outlined-basic" label="event name" variant="outlined" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                    <Button onClick={createEvent} variant="contained">Create Event</Button>
                    <Typography variant="h4" gutterBottom>
                        Event List
                    </Typography>
                </Box>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>ID</StyledTableCell>
                                <StyledTableCell align="right">詳細</StyledTableCell>
                                <StyledTableCell align="right">Name</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((event) => (
                                <StyledTableRow key={event.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {event.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">
                                        <Link href={`/home/event/${event.id}`} key={event.id} >
                                            詳細
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{event.name}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>


            </Layout>
        </div>
    );
};

export default EventList;