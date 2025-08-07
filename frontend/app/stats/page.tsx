'use client';

import React, { useEffect, useState } from 'react';
import Guest from './Guest';
import LoggedIn from './LoggedIn';
import { isUserLoggedIn } from '../utils/cookieUtils';

export default function Page() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsLoggedIn(isUserLoggedIn());
        }
        setIsLoading(false);
    }, []);

    return (
        <main className='start-home items-center justify-normal pt-24'>
            { !isLoading ? (isLoggedIn ? <LoggedIn /> : <Guest />) : '' }
        </main>
    )
}