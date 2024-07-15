'use client'

import { useEffect, useRef, useState } from "react"

export default function LoggedIn() {
    const [friends, setFriends] = useState<Array<[string, string]>>([])
    const [query, setQuery] = useState('')
    const [error, setError] = useState<string>('')
    
    const errorMap = useRef(new Map<string, string>())
    errorMap.current.set('404', 'User does not exist')
    errorMap.current.set('401', 'You are already friends')
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/friends/${document.cookie.split(';')[0].split('=')[1]}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setFriends(data);
                } else {
                    throw new Error(response.statusText);
                }
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchData();
    }, [])

    const handleRequest = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        
        fetch(`http://localhost:3001/api/friends/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: document.cookie.split(';')[0].split('=')[1],
                friend: query
            })
        })
            .then(res => {
                if (res.ok) {
                    setFriends([...friends, res as unknown as [string, string]]);
                    setError('')
                    console.log(res)
                } else {
                    throw Object.assign(new Error(res.statusText.toString()), {code: res.status.toString()})
                }
            })
            .catch((err) => {
                setError(errorMap.current.get(err.code) || err.message)
                console.log(errorMap.current.get(err.code) || err.message)
            })
    }

    return (
        <div className="completed-workout w-[45%]">
            <h1>Statistics</h1>
            <div>
                <h2>Friends</h2>
                <input type="text" placeholder="Add a friend" onChange={(e) => setQuery(e.target.value)}/>
                <button onClick={(e) => handleRequest(e)}>Add</button>
                <p>{error}</p>
                <ul>
                    {friends.map(([id, name]) =>
                        <div key={id} className="flex flex-row justify-between">
                            <li>{name}</li>
                            <button className='remove-exercise' onClick={() => {
                            fetch(`http://localhost:3001/api/friends/${id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    window.location.reload();
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                                    }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                            </button>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    )
}