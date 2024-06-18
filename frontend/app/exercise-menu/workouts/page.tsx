'use client';

import React, {useEffect, useState} from 'react';

import NoAccount from './noAccount';
import WorkoutContainer from './workoutContainer';

export default function Workouts() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsSignedIn(document.cookie.includes('token'));
        setIsLoading(false);
    }, []);

    const displayMenu = (
        <>
            <h1 className='workout-title'>Workouts</h1>
            {isSignedIn ? <WorkoutContainer /> : <NoAccount />}
        </>
    );
    
    return (
        <main className="home-page">
            <div className="exercise-container">
                {isLoading ? <p className='text-6'>Loading...</p> : displayMenu}
            </div>
        </main>
    );
}
