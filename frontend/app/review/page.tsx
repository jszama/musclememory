'use client'

import { CompletedWorkout } from "../components/interfaces"
import React from "react";
import { Suspense } from 'react'
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
    let musclesWorked: Set<string> = new Set();

    for (let i = 0; i < completedWorkout.exercises.length; i++) {
        let currMuscles = completedWorkout.exercises[i].exercise.muscleGroup;
        musclesWorked.add(currMuscles)
        
        for (let j = 0; j < completedWorkout.exercises[i].sets.length; j++) {
            //let unilateral = completedWorkout.exercises[i].unilateral; 
            
            totalVolume += completedWorkout.exercises[i].reps[j] * completedWorkout.exercises[i].weight[j];
        }
    }

    return (
        <Suspense>
            <main className="start-home">
                <section className="review-container">
                    <h1>{ completedWorkout.name } Completed</h1>
                    <section className="review-data-section">
                        <section className="stats-boxes">
                            <div className="stats-box">
                                <h3 className="stats-value">{totalVolume}kg</h3>
                                <h3 className="stats-label">Total Volume</h3>
                            </div>
                            <div className="stats-box">
                                <h3 className="stats-value">{completedWorkout.exercises.reduce((total, exercise) => total + exercise.sets.length, 0)}</h3>
                                <h3 className="stats-label">Total Sets</h3>
                            </div>
                        </section>

                        <section className="muscles-worked-container">        
                            <h2 className="muscles-worked-title">Primary Muscles Worked</h2>
                            <ol className="muscles-worked-list">
                                { Array.from(musclesWorked).map((muscleGroup: string, index: number) => (
                                    <li key={index}>
                                        <h3>{ muscleGroup }</h3>
                                    </li>
                                ))}
                                 <li key={3}>
                                        <h3>ass</h3>
                                    </li>
                            </ol>
                        </section>
                    </section>
                    <section className="review-exercises">
                        <h2 className="text-bold">Completed Exercises</h2>
                        <ul className="completed-exercises-list">
                            { completedWorkout.exercises.map((exercise, index) => (
                                <li key={index} onClick={() => {
                                    const infoDiv = document.getElementById(`exercise-info-${index}`);
                                    if (infoDiv) {
                                        infoDiv.style.display = infoDiv.style.display === 'none' ? 'block' : 'none';
                                    }
                                }}>
                                    <h3>{exercise.exercise.name}</h3>
                                    <div id={`exercise-info-${index}`} className="completed-exercise-info" style={{ display: 'none' }}>
                                        {exercise.weight.map((weight, weightIndex) => (
                                        <p key={weightIndex}>Set {weightIndex + 1}: {weight}kg x {exercise.reps[weightIndex]} </p>   
                                        ))}
                                    </div>
                                </li>
                            )) }
                        </ul>
                    </section>
                    <Link href='/' className="continue-btn">Continue</Link>
                </section>
            </main>
        </Suspense>
    );
}
