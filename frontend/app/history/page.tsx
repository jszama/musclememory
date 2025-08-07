'use client'

import React, { useEffect, useState } from 'react';
import Guest from './Guest';
import LoggedIn from './LoggedIn';
import { isUserLoggedIn } from '../utils/cookieUtils';

export default function History() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsLoggedIn(isUserLoggedIn());
        }
    }, []);
    
    return (
        <main className='start-home items-center justify-normal pt-32'>
            {isLoggedIn ? <LoggedIn /> : <Guest />}
        </main>
    )
}