'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Page() {
    const [data, setData] = useState({name: ''})
    
    useEffect(() => {
        axios('/api/hello')
        .then((res) => res.data)
        .then((data) => setData(data))
    }, [])
    
    return (
        <div>hello: {data.name}</div>
    )
}