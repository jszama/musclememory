import { Exercise } from "@/app/components/interfaces";
import { Dispatch, SetStateAction, use, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

interface WorkoutCreatorProps {
    exercisesPicked: Exercise[];
    pickMode: (boolean | Dispatch<SetStateAction<boolean>>)[];
    setPickMode: (mode: boolean) => void;
}

export default function WorkoutCreator({ exercisesPicked, pickMode, setPickMode }: WorkoutCreatorProps) {
    const [reset, setReset] = useState(false);
    const router = useRouter();

    const CreateWorkout = () => {
        const workoutTitleInput = document.querySelector('.workout-title-input') as HTMLInputElement;

        fetch('http://localhost:3001/api/workouts/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: document.cookie.split(';')[0].split('=')[1], 
                name: (workoutTitleInput?.value || 'Unnamed Workout'),
                exercises: exercisesPicked,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                exercisesPicked.splice(0, exercisesPicked.length);
                router.push('/exercise-menu/workouts');
            });

    }

    return (
        <>
        <div className="exercise-bank">
            <input className="workout-title-input" placeholder="Workout Name" />
            <div className="exercise-list items-center overflow-auto max-h-[70%] h-auto">
                {exercisesPicked.map((exercise, index) => (
                    <div className='exercise-card flex flex-row justify-between mx-2 w-[60%] text-primary-500' key={index}>
                        <h2>{exercise.name}</h2>
                        <button className="remove-exercise text-black" onClick={() => {
                            exercisesPicked.splice(index, 1);
                            setReset(!reset);
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="15" y1="9" x2="9" y2="15" />
                                <line x1="9" y1="9" x2="15" y2="15" />
                            </svg>
                        </button>
                    </div>
                ))}   
            </div>
            <button className="add-exercise-large" onClick={() => setPickMode(true)}>+</button>
        </div>
            <button className="create-workout" onClick={() => {
                CreateWorkout();
            }}>SAVE</button>
    </>
    );
}
