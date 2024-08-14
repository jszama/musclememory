import React, { useState, useEffect } from 'react';
import { Workout } from '../components/interfaces';

interface WorkoutPickerProps {
    pickedWorkout: Workout[],
    setPickedWorkout: React.Dispatch<React.SetStateAction<Workout[]>>
}

export default function WorkoutPicker({ pickedWorkout, setPickedWorkout }: WorkoutPickerProps) { 
    const [workouts, setWorkouts] = useState([] as Workout[])
    
    useEffect(() => {
        fetch(`https://musclememory-backend.onrender.com/api/workouts/all/${document.cookie.split(';')[0].split('=')[1]}`)
            .then(res => res.json())
            .then(data => setWorkouts(data))
            .catch(err => console.error(err))
    }, [])
    
    const submitWorkout = () => {
        const selectedWorkoutId = (document.querySelector('.select-workout') as HTMLSelectElement)?.value;
        if (selectedWorkoutId === 'freestyle') {
            setPickedWorkout([...pickedWorkout,{
                _id: 'freestyle',
                name: 'Freestyle',
                exercises: []
            }]);
            return;
        }
        const selectedWorkout = workouts.find(workout => workout._id === selectedWorkoutId) as Workout;
        setPickedWorkout([...pickedWorkout, selectedWorkout]);
    }

    return (
        <div className="choose-workout-container">
            <h1>Choose a workout plan to get started</h1>

            <select className="select-workout">
                {workouts.map((workout: Workout) => {
                    return <option key={workout._id} value={workout._id}>{workout.name}</option>
                })}
                <option value="freestyle">Freestyle</option>
            </select>

            <button onClick={() => submitWorkout()} className='start-btn-small'>START</button>
        </div>
    )
}
