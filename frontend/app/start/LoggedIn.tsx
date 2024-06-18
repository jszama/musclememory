'use client'

import React, { useEffect, useState } from 'react'
import { Workout } from '../components/interfaces'

import WorkoutPicker from './WorkoutPicker'
import StartWorkout from './StartWorkout'

export default function LoggedIn() {
    const [pickedWorkout, setPickedWorkout] = useState([] as Workout[])
    const [start, setStart] = useState(false)

    useEffect(() => {
        if (pickedWorkout[0]) {
            setStart(true)
        }
    }, [pickedWorkout])

    return (
        <>
            {start ?
                <StartWorkout pickedWorkout={pickedWorkout} />
                :
                <WorkoutPicker pickedWorkout={pickedWorkout} setPickedWorkout={setPickedWorkout} />}
        </>
    )
}