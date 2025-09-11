'use client';

import { useState, useEffect } from 'react';
import LoggedIn from './LoggedIn';
import Guest from './Guest';
import { isUserLoggedIn } from '../utils/cookieUtils';

export default function Start() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
        if (typeof window !== 'undefined') {
            setIsLoggedIn(isUserLoggedIn());
        }
    }
    , []);
    
    return (
        <main className='start-home'>
            { isLoading ? <p>Loading...</p> : isLoggedIn ? <LoggedIn/> : <Guest/>}
        </main>
    )
}