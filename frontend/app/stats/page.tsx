'use client';

import React, { useEffect, useState } from 'react';
import Guest from './Guest';
import LoggedIn from './LoggedIn';

export default function Page() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() =>
        setIsLoggedIn(document?.cookie.includes('token'))
    , []);

    return (
        <main className='start-home items-center justify-normal pt-32'>
            {isLoggedIn ? <LoggedIn /> : <Guest />}
        </main>
    )
}