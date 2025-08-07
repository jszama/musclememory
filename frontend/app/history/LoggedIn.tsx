'use client'

import { useEffect, useRef, useState } from "react"
import { CompletedWorkout } from "../components/interfaces"
import { getUserIdFromCookie } from "../utils/cookieUtils"

export default function LoggedIn() {
    const [history, setHistory] = useState([] as CompletedWorkout[])
    const [selectedWorkout, setSelectedWorkout] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const userId = getUserIdFromCookie();
        if (userId) {
            fetch(`https://musclememory-backend.onrender.com/api/completed_workouts/all/${userId}`)
                .then(res => res.json())
                .then(data => {
                    setHistory(data)
                    setIsLoading(false)
                 })
                .catch(err => console.error(err))
        }
    }, [])

    const handleDescription = (id: string) => {
        if (selectedWorkout === id) {
            setSelectedWorkout("");
        } else {
            setSelectedWorkout(id);
        }
    }

    return (
        <div className="workout-history">
            <h1>History</h1>
            <ul className="workout-history-list">
                {isLoading ? <span className="loading-bar"></span> :
                    ( history.length === 0 && <p className="empty-state">No workouts yet, but we know you’ve got this. Let’s make history!</p>) }
                {history.map((workout: CompletedWorkout) => {
                    return (
                        <li key={workout._id} onClick={() => handleDescription(workout._id)} className={`workout-history-info ${selectedWorkout === workout._id ? 'scale-[1.02]' : ''}`}>
                            <span className="workout-history-card">
                                <h2>{workout.name}</h2>
                                <p>{new Date(workout.date).toLocaleDateString()}</p>
                            </span>
                            <ul className={`${selectedWorkout === workout._id ? 'workout-history-details' : 'hidden'}`} >
                                {workout.exercises.map(exercise => {
                                    return (
                                        <li key={exercise.exercise._id} className="workout-history-item">
                                            <h3>{exercise.exercise.name}</h3>

                                            {exercise.sets.map((set, index) => {
                                                return (
                                                    <div key={index}>
                                                        <p>Set {set}: {exercise.reps[index]} x {exercise.weight[index]}kg</p>
                                                    </div>
                                                    
                                                )
                                            })}
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}