'use client';

import React from 'react';
import ExerciseList from './exerciseList';

export default function ExerciseBank() {

    return (
        <main className="home-page">
            <div className="exercise-container">
                <ExerciseList />
            </div>
        </main>
    );
}
