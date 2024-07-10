'use client'

import { CompletedWorkout } from "../components/interfaces"
import React from "react";
import { useSearchParams } from "next/navigation";
import Link  from "next/link";

export default function ReviewScreen() {
    const search = useSearchParams();

    const completedWorkout = JSON.parse(search.get('workout') || '') as CompletedWorkout;

    if (completedWorkout === null) {
        return (
            <main className="start-home">
                <section className="completed-workout">
                    <h1>Workout Not Found</h1>
                    <Link href='/' className="start-btn-small mb-4">Continue</Link>
                </section>
            </main>
        );
    }
    
    let totalVolume = 0;
    let musclesWorked: string[] = [];

    for (let i = 0; i < completedWorkout.exercises.length; i++) {
        let currMuscles = completedWorkout.exercises[i].exercise.muscleGroup;

        if (!musclesWorked.includes(currMuscles)) {
            musclesWorked.push(currMuscles)
        }
        
        for ( let j = 0; j < completedWorkout.exercises[i].sets.length; j++) {
            totalVolume += completedWorkout.exercises[i].reps[j] * completedWorkout.exercises[i].weight[j];
        }
    }

    return (
        <main className="start-home">
            <section className="completed-workout">
                <h1>{ completedWorkout.name } Completed</h1>
                <div className="completed-workout-info">
                    <h2><span className="text-bold">Total Volume:</span> { totalVolume }kg</h2>
                    <section className="flex flex-row justify-around w-full gap-x-4">        
                        <section>
                            <h2 className="text-bold">Exercises</h2>
                            <ul className="completed-workout-list">
                                { completedWorkout.exercises.map((exercise, index) => (
                                    <li key={index}>
                                        <h3>{ exercise.exercise.name }</h3>
                                        <p>Sets: {exercise.sets.length}</p>
                                    </li>
                                )) }
                            </ul>
                        </section>
                        <section>
                            <h2 className="text-bold">Primary Muscles Worked</h2>
                            <ul className="completed-workout-list">
                                { musclesWorked.map((muscleGroup, index) => (
                                    <li key={index}>
                                        <h3>{ muscleGroup }</h3>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </section>
                </div>
                <Link href='/' className="start-btn-small mb-4">Continue</Link>
            </section>
        </main>
    );
}
