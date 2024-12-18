'use client';

import React, { useEffect, useState, useRef } from 'react';

import { Workout } from '@/app/components/interfaces';
import WorkoutList from './workoutList';
import FirstWorkout from './firstWorkout';
import { useRouter} from 'next/navigation';

export default function WorkoutContainer() {
    const router = useRouter();

    const [workouts, setWorkouts] = useState([] as Workout[]);
    const [isLoading, setIsLoading] = useState(true);
    const noWorkoutsRef = useRef(false);

    useEffect(() => { 
        let noWorkouts = false;
        fetch(`https://musclememory-backend.onrender.com/api/workouts/all/${document.cookie.split(';')[0].split('=')[1]}`, {
            mode: 'cors',
        })
            .then(response => response.json())
            .then(data => {
                setWorkouts(data);
                noWorkouts = !data || data.length === 0;
                noWorkoutsRef.current = noWorkouts;
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            {isLoading ? <span className='loading-bar'></span> : (
                noWorkoutsRef.current ? <FirstWorkout /> : <WorkoutList workoutsProp={workouts}/>
            )}
            <button className='create-workout' onClick={() => router.replace('/exercise-menu/workouts/create')}>CREATE</button>
        </>
    )
}