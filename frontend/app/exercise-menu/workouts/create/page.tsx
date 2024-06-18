'use client';

import React, { useState } from 'react';

import { Exercise } from "@/app/components/interfaces";

import ExercisePicker from './exercisePicker';
import WorkoutCreater from './workoutCreater';
const exercises: Exercise[] = [];


export default function CreateWorkout() {
    const [pickMode, setPickMode] = useState(false);

    return (
        <main className="home-page">
            <div className="exercise-container">
            <h1 className="workout-title text-8">Create Workout</h1>
                { pickMode ? <ExercisePicker exercisesPicked={exercises} pickMode={[pickMode, setPickMode]} setPickMode={function (mode: boolean): void {
                    setPickMode(mode);
                } } /> : <WorkoutCreater exercisesPicked={exercises} pickMode={[pickMode, setPickMode]} setPickMode={function (mode: boolean): void {
                    setPickMode(mode);
                } } />}
            </div>
        </main>
    )
}