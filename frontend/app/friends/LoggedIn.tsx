'use client'

import { useEffect, useRef, useState } from "react"

export default function LoggedIn() {
    const [friends, setFriends] = useState<Array<[string, string]>>([])
    const [friendRequests, setFriendRequests] = useState<Array<[string, string]>>([])
    const [query, setQuery] = useState('')
    const [error, setError] = useState<string>('')

    const [showRequests, setShowRequests] = useState<boolean>(false)

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                fetch(`https://musclememory-backend.onrender.com/api/friends/${document.cookie.split(';')[0].split('=')[1]}`).then(response => response.json()).then(data => {
                    setFriends(data)
                });
                
                fetch(`https://musclememory-backend.onrender.com/api/friends/requests/${document.cookie.split(';')[0].split('=')[1]}`).then(response => response.json()).then(data => {
                    setFriendRequests(data)
                });
            } catch (err) {
                console.error(err);
            }
        };
    
        fetchData();
    }, [])

    const sendRequest = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        
        try {
            const res = await fetch(`https://musclememory-backend.onrender.com/api/friends/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: document.cookie.split(';')[0].split('=')[1],
                    friend: query
                })
            });
    
            if (!res.ok) {
                const errorData = await res.json();
                setError(errorData.error || 'Something went wrong');
            } else {
                setError('Friend request sent');
            }
        } catch (err) {
            setError('Network error');
            console.error('Network error:', err);
        }
    };
    

    const acceptRequest = (requestSender: string) => {
        fetch(`https://musclememory-backend.onrender.com/api/friends/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: document.cookie.split(';')[0].split('=')[1],
                friend: requestSender
            })
        })
            .then(res => {
                if (res.ok) {
                    window.location.reload();
                } else {
                    throw Object.assign(new Error(res.statusText.toString()), {code: res.status.toString()})
                }
            })
            .catch((err) => {
                setError( err.message)
            })
    }

    const declineRequest = (requestSender: string) => {
        fetch(`https://musclememory-backend.onrender.com/api/friends/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: document.cookie.split(';')[0].split('=')[1],
                friend: requestSender
            })
        })
            .then(res => {
                if (res.ok) {
                    window.location.reload();
                } else {
                    throw Object.assign(new Error(res.statusText.toString()), {code: res.status.toString()})
                }
            })
            .catch((err) => {
                setError(err.message)
            })
    }
    return (
        <div className="friends">
            {showRequests ? ( 
                <>
                <h1>Friend Requests</h1>
                <div className='friends-info'>
                        <ul className="friends-list">
                        {friendRequests.map(([id, name]) =>
                            <div key={id} className="friends-request-item">
                                <li>{name}</li>
                                <div className="friends-request-options">
                                    <button className='request-accept-btn' onClick={(e) => acceptRequest(id)}>Accept</button>
                                    <button className='request-decline-btn' onClick={(e) => declineRequest(id)}>Decline</button>
                                </div>
                            </div>
                        )}
                    </ul>
                </div>
                <button className='request-tab-btn' onClick={() => setShowRequests(!showRequests)}>FRIENDS</button>
                </>
                )
                :
                (
                <>
                <h1>Friends</h1>
                <div className="friends-info">
                    <section className="friends-search-box">
                        <input className='friends-search' type="text" placeholder="Add a friend" onChange={(e) => setQuery(e.target.value)}/>
                        <button className='friend-search-btn' onClick={(e) => sendRequest(e)}>+</button>
                    </section>
                    <p className="friends-error">{error}</p>
                    <ul className="friends-list">
                        {friends.length === 0 ? <li className="friends-list-item">No friends</li> : (
                            friends.map(([id, name]) => (
                                <div key={id} className="friends-list-item">
                                    <li>{name}</li>
                                    <button className='remove-exercise' onClick={() => {
                                        fetch(`https://musclememory-backend.onrender.com/api/friends/${id.toString()}`, {
                                            method: 'DELETE',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            }
                                        })
                                        .then( () => {
                                            setFriends(friends.filter(([id2, name]) => id2 !== id));
                                            setError('Friend removed')
                                        }).catch((error) => {
                                                console.error('Error:', error);
                                            });
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="15" y1="9" x2="9" y2="15" />
                                            <line x1="9" y1="9" x2="15" y2="15" />
                                        </svg>
                                    </button>
                                </div>
                            )))}
                    </ul>
                </div>
                <button className='friends-tab-btn' onClick={() => setShowRequests(!showRequests)}>REQUESTS</button>
                </>)}
        </div>
        )
}