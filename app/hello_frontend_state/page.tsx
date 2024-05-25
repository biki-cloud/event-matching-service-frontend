'use client'

import { useEffect, useState } from 'react'

export default function Page() {
    const [data, setData] = useState({name: 'init'})

    useEffect(() => {
        const change = { name: 'changed' }
        setData(change)
    }, [])

    return <div>Hello {data.name}</div>
}