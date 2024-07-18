'use client'

import { useEffect, useRef, useState } from "react"
import { CompletedWorkout, ActiveExercise, Exercise } from "../components/interfaces"
import Link from "next/link"

export default function LoggedIn() {
    const [history, setHistory] = useState([] as CompletedWorkout[])
    const totalWorkouts = useRef(0)
    const totalVolume = useRef(0)
    const totalReps = useRef(0)
    const totalSets = useRef(0)

    useEffect(() => {
        fetch(`http://localhost:3001/api/completed_workouts/all/${document.cookie.split(';')[0].split('=')[1]}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setHistory(data)
             })
            .catch(err => console.error(err))
        
        totalWorkouts.current = history.length
        
        for (let workout of history) {
            for (let exercise of workout.exercises) {
                totalSets.current += exercise.sets.length
                for (let i = 0; i < exercise.sets.length; i++) {
                    totalVolume.current += exercise.reps[i] * exercise.weight[i]
                    totalReps.current += exercise.reps[i]
                }
            }
        }
    }, [])

    

    return (
        <div className="completed-workout w-[45%]">
            <h1>Statistics</h1>
            <div>
                <div>
                    <h2>Total Workouts</h2>
                    <p>{totalWorkouts.current}</p>
                </div>
                <div>
                    <h2>Total Sets</h2>
                    <p>{totalSets.current}</p>
                </div>
                <div>
                    <h2>Total Reps</h2>
                    <p>{totalReps.current}</p>
                </div>
                <div>
                    <h2>Total Volume</h2>
                    <p>{totalVolume.current}</p>
                </div>
            </div>
            <p>Want to see previous workouts?</p>
            <Link href="/history" className="start-btn-small">History</Link>
        </div>
    )
}