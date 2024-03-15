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
    // { 
    //     id: 1,
    //     name: 'Chest Day',
    //     exercises: exercises
    // }
]

export default function Workouts() {
    const noWorkouts = !workouts.length;
    return (
        <main className="home-page">
            <div className="exercise-container">
                <h1 className='workout-title'>Workouts</h1>
                {noWorkouts ? 
                    (<div className='no-workouts'>
                        <h1>Get started on your fitness goals! Create your first workout plan today</h1>
                        <button>Create Workout</button>
                    </div>)
                    :
                    (<section className="exercise-bank">
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
                            <Image src='/addBtn.png' alt='Add workout' height={36} width={36} onClick={() => { }} />
                        </div>
                    </section>
                </section>)}
            </div>
        </main>
    );
}
