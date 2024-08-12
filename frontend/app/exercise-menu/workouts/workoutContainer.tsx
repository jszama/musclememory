'use client';

import React, { useEffect, useState, useRef } from 'react';

import { Workout } from '@/app/components/interfaces';
import WorkoutList from './workoutList';
import FirstWorkout from './firstWorkout';

export default function WorkoutContainer() {
    const [workouts, setWorkouts] = useState([] as Workout[]);
    const [isLoading, setIsLoading] = useState(true);
    const noWorkoutsRef = useRef(false);

    useEffect(() => { 
        let noWorkouts = false;
        fetch(`http://localhost:3001/api/workouts/all/${document.cookie.split(';')[0].split('=')[1]}`, {
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
            {isLoading ? null : (
                noWorkoutsRef.current ? <FirstWorkout /> : <WorkoutList workoutsProp={workouts} />
            )}
        </>
    )
}