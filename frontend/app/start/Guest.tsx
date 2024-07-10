'use client';

import React, { useState } from 'react';
import { Exercise } from '../components/interfaces';
import StartWorkout from './StartWorkout';

export default function Guest() {
    let pickedWorkout = [{
        _id: 'freestyle',
        name: 'Freestyle',
        exercises: [] as Exercise[]
    }];

    const [start, setStart] = useState(false)

    const submitWorkout = () => {
        setStart(true)
    }

    return (
    <>
        { start ?
            <StartWorkout pickedWorkout = { pickedWorkout } loggedIn={false} />
        :(
            <div className="guest-screen">
                <p>
                    Create an account to be able to create your own workouts and access our full range of services!
                </p>
                <button className="start-btn-small" onClick={() => submitWorkout()}>
                    CONTINUE
                </button>
            </div>
        )}
    </>
        )
    }
