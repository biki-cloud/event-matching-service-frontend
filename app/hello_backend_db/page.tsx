'use client'

import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Page() {
    const [data, setData] = useState({message: ''})
    
    useEffect(() => {
        axios.get('http://localhost:8000/api/hello_db/backend/')
        // axios.get('/api/hello/backend')
        .then((res) => res.data)
        .then((data) => {
            setData(data);
            console.log(data);
        })
    }, [])
    
    return (
        <div>hello: {data.message}</div>
    )
}