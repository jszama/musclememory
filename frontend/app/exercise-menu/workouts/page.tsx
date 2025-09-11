'use client';

import {useEffect, useState} from 'react';

import NoAccount from './noAccount';
import WorkoutContainer from './workoutContainer';
import { isUserLoggedIn } from '../../utils/cookieUtils';

export default function Workouts() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsSignedIn(isUserLoggedIn());
        }
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
                {isLoading ? null : displayMenu}
            </div>
        </main>
    );
}
