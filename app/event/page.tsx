'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'


type EventData = {
    id: number;
    name: string;
};

export default function Page() {
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
            <ul>
                {events.map((e: EventData) => {
                    return <li key={e.id}>id: {e.id}, name: {e.name}</li>
                })}
            </ul>

            <h1>create event</h1>
            <input type="text" placeholder="event name" value={eventName} 
            onChange={(e) => setEventName(e.target.value)} />
            <button onClick={createEvent}>create event</button>
        </div>
    )
}
