import React, { useState } from 'react';
import { Workout, Exercise } from '../../components/interfaces';

import { useRouter } from 'next/navigation';

export default function WorkoutList({ workoutsProp }: { workoutsProp: Workout[] }) {
    const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
    const router = useRouter();
    
    const handleDescription = (workout: Workout) => {
        if (selectedWorkout === workout) {
            setSelectedWorkout(null);
        } else {
            setSelectedWorkout(workout);
        }
    }
    
    const workoutList = () => {
        return (
            workoutsProp.map((workout: Workout) => (
                <div key={workout._id} className='workout-card items-start flex-col' onClick={() => handleDescription(workout)}>
                    <div className='flex flex-row justify-between w-full'>
                        <h2>{workout.name}</h2>
                        <button className='remove-exercise' onClick={() => {
                            fetch(`https://musclememory-backend.onrender.com/api/workouts/${workout._id}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                }
                            })
                                .then(response => response.json())
                                .then(data => {
                                    window.location.reload();
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                        </svg>
                        </button>
                    </div>
                    <div className={`${selectedWorkout === workout ? 'display-exercises' : 'hidden'}`}>
                        {workout.exercises.map((exercise: Exercise) => (
                            <div key={exercise.name}>
                                <h3>{exercise.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            ))
        );
    }
    
    return (
        <>
        <section className="workout-bank">
                <section className="workout-list">
                    {workoutList()}
                </section>
        </section>
        <button className='create-workout' onClick={() => router.replace('/exercise-menu/workouts/create')}>CREATE</button>
        </>
    );
}
