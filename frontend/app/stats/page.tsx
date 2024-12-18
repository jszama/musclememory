'use client';

import React, { useEffect, useState } from 'react';
import Guest from './Guest';
import LoggedIn from './LoggedIn';

export default function Page() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoggedIn(document?.cookie.includes('token'));
        setIsLoading(false);
    }, []);

    return (
        <main className='start-home items-center justify-normal pt-32'>
            { !isLoading ? (isLoggedIn ? <LoggedIn /> : <Guest />) : '' }
        </main>
    )
}