'use client';

import React, { useState, useEffect } from 'react';
import LoggedIn from './LoggedIn';
import Guest from './Guest';

export default function Start() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
        setIsLoggedIn(document?.cookie.includes('token'));
    }
    , [setIsLoading, isLoggedIn])
    
    return (
        <main className='start-home'>
            { isLoading ? <p>Loading...</p> : isLoggedIn ? <LoggedIn/> : <Guest/>}
        </main>
    )
}