'use client'

import { useEffect, useRef, useState } from "react"
import { CompletedWorkout, ActiveExercise, Exercise } from "../components/interfaces"

export default function LoggedIn() {
    const [history, setHistory] = useState([] as CompletedWorkout[])
    const [selectedWorkout, setSelectedWorkout] = useState('')
    const dateRef = useRef(new Date())

    useEffect(() => {
        fetch(`http://localhost:3001/api/completed_workouts/all/${document.cookie.split(';')[0].split('=')[1]}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setHistory(data)
             })
            .catch(err => console.error(err))
    }, [])

    const handleDescription = (id: string) => {
        if (selectedWorkout === id) {
            setSelectedWorkout("");
        } else {
            setSelectedWorkout(id);
        }
    }

    return (
        <div className="completed-workout w-[45%]">
            <h1>History</h1>
            { history.length === 0 && <p>No workouts completed yet</p> }
            <ul className="completed-workout-list items-center h-[80%] max-h-[90%] w-[60%]">
                {history.map((workout: CompletedWorkout) => {
                    return (
                        <li key={workout._id} onClick={() => handleDescription(workout._id)} className={`completed-workout-info w-full ${selectedWorkout === workout._id ? 'scale-[1.02]' : ''}`}>
                            <span className="flex flex-row justify-between border-b-[3px] border-gray-100">
                                <h2>{workout.name}</h2>
                                <p>{new Date(workout.date).toLocaleDateString()}</p>
                            </span>
                            <ul className={`${selectedWorkout === workout._id ? 'flex flex-col overflow-auto text-2' : 'hidden'}`} >
                                {workout.exercises.map(exercise => {
                                    return (
                                        <li key={exercise.exercise._id} className="border-b-[3px] rounded-[3px] border-gray-250 py-1">
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