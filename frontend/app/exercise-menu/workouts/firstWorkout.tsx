import React from 'react';
import { useRouter } from 'next/navigation';

export default function FirstWorkout() {
    const router = useRouter();

    return (
        <div className='no-workouts'>
            <h1>Get started on your fitness goals! Create your first workout plan today</h1>
            <button onClick={() => router.replace('/exercise-menu/workouts/create')}>Create Workout</button>
        </div>
    )
}