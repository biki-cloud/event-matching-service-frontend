'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export const Event = () => {
    const [eventName, setEventName] = useState<string>('');
    const [events, setEvents] = useState<Array<EventData>>([]);

    useEffect(() => {
        axios.get('http://localhost:8001/api/events/')
            .then((res) => res.data)
            .then((data) => {
                setEvents(data);
                console.log(data);
                data.forEach((e: EventData) => {
                    console.log(e.id, e.name);
                });
            })
    }, [events])

    const createEvent = () => {
        console.log('create event');
        axios.post('http://localhost:8001/api/events/',
            {
                name: eventName
            })
            .then((res) => res.data)
            .then((data) => {
                console.log(data);
                setEvents(data);
            })
    }

    return (
        <div>
            <h1>events list</h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell align="right">Name</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {events.map((event) => (
                            <StyledTableRow key={event.name}>
                                <StyledTableCell component="th" scope="row">
                                    {event.id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{event.name}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <h1>create event</h1>
            <input type="text" placeholder="event name" value={eventName}
                onChange={(e) => setEventName(e.target.value)} />
            <button onClick={createEvent}>create event</button>

        </div>
    )
}
