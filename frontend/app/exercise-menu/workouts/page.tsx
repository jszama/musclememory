'use client';

import React from 'react';
import Image from 'next/image';

interface Exercise {
    id: number;
    name: string;
    description: string;
  }

interface Workout {
    id: number;
    name: string;
    exercises: Exercise[];
  }

const exercises: Exercise[] = [
        {
            id: 1,
            name: 'Bench Press',
            description: 'The bench press is a compound exercise that builds strength and muscle in the chest, shoulders, and triceps'
        },{
            id: 2,
            name: 'Ab Crunch',
            description: 'The bench press is a compound exercise that builds strength and muscle in the chest, shoulders, and triceps'
        },{
            id: 1,
            name: 'Bench Press',
            description: 'The bench press is a compound exercise that builds strength and muscle in the chest, shoulders, and triceps'
        },{
            id: 1,
            name: 'Bench Press',
            description: 'The bench press is a compound exercise that builds strength and muscle in the chest, shoulders, and triceps'
        },{
            id: 1,
            name: 'Bench Press',
            description: 'The bench press is a compound exercise that builds strength and muscle in the chest, shoulders, and triceps'
    }]
        
const workouts: Workout[] = [
    {
        id: 1,
        name: 'Chest Day',
        exercises: [exercises[0], exercises[1]]
    },
    {
        id: 2,
        name: 'Back Day',
        exercises: [exercises[2], exercises[3]]
    },
    {
        id: 3,
        name: 'Leg Day',
        exercises: [exercises[4], exercises[0]]
    }
]

export default function ExerciseBank() {
    return (
        <main className="home-page">
            <div className="exercise-container">
                <h1 className='workout-title'>Workouts</h1>
                <section className="exercise-bank">
                    <section className="workout-list">
                    {workouts.map((workout) => (
                        <div className="workout-block" key={workout.id}>
                            <div className='workout-card' key={workout.name}>
                                <h3>{workout.name}</h3>
                                <div className='workout-info'>
                                    {workout.exercises.map((exercise) => (
                                        <div key={exercise.id}>
                                            <h4>{exercise.name}</h4>
#                                       </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='workout-add'>
                            <Image src='/addBtn.png' alt='Add workout' height={36} width={36} onClick={ () => {}} />
                    </div>
                    </section>
                </section>
            </div>
        </main>
    );
}
