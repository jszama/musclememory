import React, { useEffect, useState } from 'react';
import { Workout, Exercise, CompletedWorkout, ActiveExercise } from '../components/interfaces';
import ExercisePicker from '../exercise-menu/workouts/create/exercisePicker';
import ExerciseScreen from './exerciseScreen';
import { useRouter } from 'next/navigation';

interface WorkoutPickerProps {
    pickedWorkout: Workout[];
    loggedIn: boolean;
}

export default function StartWorkout({ pickedWorkout, loggedIn }: WorkoutPickerProps) {
    const router = useRouter();
    const selectedWorkout = pickedWorkout[0] as Workout;

    const user_id = document?.cookie.split(';')[0].split('=')[1];

    const [addExercise, setAddExercise] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

    const [canGoLeft, setCanGoLeft] = useState(false);
    const [canGoRight, setCanGoRight] = useState(false);

    const [activeExercises, setActiveExercises] = useState<ActiveExercise[]>(selectedWorkout.exercises.map((exercise: Exercise) => {
        return {
            exercise: exercise,
            sets: [1],
            reps: [0],
            weight: [0]
        };
    }));

    const updateExercise = (index: number, updatedExercise: ActiveExercise) => {
        const updatedExercises = [...activeExercises];
        updatedExercises[index] = updatedExercise;
        setActiveExercises(updatedExercises);
    };

    useEffect(() => {
        const checkExercise = () => {
            if (currentExerciseIndex === 0) {
                setCanGoLeft(false);
            } else {
                setCanGoLeft(true);
            }

            if (currentExerciseIndex >= activeExercises.length - 1) {
                setShowButton(true);
                setCanGoRight(false);
            } else {
                setShowButton(false);
                setCanGoRight(true);
            }
        };
        checkExercise();
    }, [currentExerciseIndex, activeExercises.length]);

    const handleLeft = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
        }
    };

    const handleRight = () => {
        if (currentExerciseIndex < activeExercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
        }
    };

    const addExerciseBody = (
        <ExercisePicker
            exercisesPicked={selectedWorkout.exercises}
            pickMode={[true]}
            setPickMode={async (mode: boolean) => {
                const newExercise = {
                    exercise: selectedWorkout.exercises[currentExerciseIndex],
                    sets: [1],
                    reps: [0],
                    weight: [0]
                };

                setActiveExercises((prevExercises) => [...prevExercises, newExercise]);
                setAddExercise(false);
                setShowButton(false);
                setCanGoRight(true);
                setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
            }}
        />
    );

    const addExerciseButton = (
        <button className="add-exercise-large" onClick={() => setAddExercise(!addExercise)}>+</button>
    );

    return (
        <div className="start-workout-container">
            <div className="top-row">
                <h1 className="absolute">{selectedWorkout.name}</h1>
                <button onClick={() => router.replace('/')} className="ml-auto">
                    Exit
                </button>
            </div>
            <div className="flex flex-row min-w-full min-h-[70%] justify-center">
                {canGoLeft ? (
                    <button className="change-exercise-button" onClick={handleLeft}>
                        Left
                    </button>
                ) : (
                    <button className="invisible change-exercise-button">Left</button>
                )}
                <div className="body">
                    {showButton ? (
                        !addExercise ? (
                            <div className="add-exercise-body">{addExerciseButton}</div>
                        ) : (
                            <div className="exercise-container my-1 border-0 justify-start">{addExerciseBody}</div>
                        )
                    ) : (
                        <div>
                            <ExerciseScreen
                                key={currentExerciseIndex}
                                exercise={{ ...activeExercises[currentExerciseIndex] }}
                                onUpdateExercise={(updatedExercise) => updateExercise(currentExerciseIndex, updatedExercise)}
                            />
                        </div>
                    )}
                </div>
                {canGoRight ? (
                    <button className="change-exercise-button" onClick={handleRight}>
                        Right
                    </button>
                ) : (
                    <button className="invisible change-exercise-button">Right</button>
                )}
            </div>
            <button
                className="finish-workout-button"
                onClick={async () => {
                    const completed = {
                        user_id: user_id,
                        name: selectedWorkout.name,
                        exercises: activeExercises
                    } as CompletedWorkout;

                    if (loggedIn) {
                        try {
                            const response = await fetch('http://localhost:3001/api/completed_workouts/add', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(completed)
                            });
                            const data = await response.json();
                            console.log(data);
                            router.replace(`/review?workout=${JSON.stringify(completed)}`);
                        } catch (err) {
                            console.error(err);
                        }
                    } else {
                        router.replace(`/review?workout=${JSON.stringify(completed)}`);
                    }
                }}
            >
                Finish
            </button>
        </div>
    );
}
