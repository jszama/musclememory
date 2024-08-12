'use client'

import { useEffect, useState, useRef } from "react"
import Link from "next/link"

export default function LoggedIn() {
    const totalWorkouts = useRef(0)
    const totalVolume = useRef(0)
    const totalReps = useRef(0)
    const totalSets = useRef(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3001/api/completed_workouts/all/${document.cookie.split(';')[0].split('=')[1]}`)
            .then(res => res.json())
            .then(data => {
                totalWorkouts.current = data.length
                
                for (let workout of data) {
                    for (let exercise of workout.exercises) {
                        totalSets.current += exercise.sets.length
                        for (let i = 0; i < exercise.sets.length; i++) {
                            totalVolume.current += exercise.reps[i] * exercise.weight[i]
                            totalReps.current += exercise.reps[i]
                        }
                    }
                }
                setIsLoading(false)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <>
        
            {isLoading ? <p>Loading...</p> : (
                <div className="statistics">
                    <h1>Statistics</h1>
                    <div className="statistics-info">
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
                            <p>{totalVolume.current} kg</p>
                        </div>
                    </div>
                    <p className="statistics-redirect-text">Want to see previous workouts?</p>
                    <Link href="/history" className="statistics-button">H I S T O R Y</Link>
                </div>
            )}
        </>
    )
}