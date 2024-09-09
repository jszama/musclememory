import React, { useEffect, useState } from 'react';
import { Workout, Exercise, CompletedWorkout, ActiveExercise } from '../components/interfaces';
import ExercisePicker from './exercisePicker';
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
    const [loading, setLoading] = useState(false);

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
        const checkExercise = async () => {
            if (currentExerciseIndex === 0) {
                setCanGoLeft(false);
            } else {
                setCanGoLeft(true);
            }
    
            if (currentExerciseIndex > activeExercises.length - 1) {
                setShowButton(true);
                setCanGoRight(false);
            } else {
                setShowButton(false);
                setCanGoRight(true);
            }
        };
        setLoading(false)
    
        async function fetchData() {
            await checkExercise();
        }
        fetchData();
    }, [activeExercises.length, currentExerciseIndex]);

    const handleLeft = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
        }
    };

    const handleRight = () => {
        if (currentExerciseIndex <= activeExercises.length - 1) {
            setCurrentExerciseIndex(currentExerciseIndex + 1);
            setLoading(true)
        }
    };

    const addExerciseBody = (
        <ExercisePicker
            exercisesPicked={activeExercises}
            pickMode={[true]}
            setPickMode={async () => {
                setAddExercise(false);
                setShowButton(false);
            }}
        />
    );

    const addExerciseButton = (
        <button className="add-exercise-large" onClick={() => setAddExercise(!addExercise)}>+</button>
    );

    return (
        <div className="start-workout-container">
            <div className="top-row">
                <h1 className="absolute text-bold">{selectedWorkout.name}</h1>
                <button onClick={() => router.replace('/')} className="remove-exercise ml-auto mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="15" y1="9" x2="9" y2="15" />
                        <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                </button>
            </div>
            <div className="flex flex-row min-w-full h-[75%] justify-center">
                {canGoLeft ? (
                    <button className="change-exercise-button" onClick={handleLeft}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 4L8 12L16 20" stroke="rgb(123, 104, 238)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                ) : (
                    <button className="invisible change-exercise-button">Left</button>
                )}
                <div className="body">
                    {!loading && (
                        showButton ? (
                            !addExercise ? (
                                <div className="add-exercise-body">{addExerciseButton}</div>
                            ) : (
                                <div className="add-exercise-box">{addExerciseBody}</div>
                            )
                        ) : (
                                <>  
                                    <button className='remove-exercise-btn' onClick={() => {
                                        if (activeExercises.length > 1) {
                                            const updatedExercises = activeExercises.filter((_, index) => index !== currentExerciseIndex);
                                    
                                            setActiveExercises(updatedExercises);
                                            setCurrentExerciseIndex(prevIndex => Math.min(prevIndex, updatedExercises.length - 1));
                                        } else {
                                            setShowButton(true);
                                        }
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="15" y1="9" x2="9" y2="15" />
                                            <line x1="9" y1="9" x2="15" y2="15" />
                                        </svg>
                                    </button>
                                <ExerciseScreen
                                    key={currentExerciseIndex}
                                    exercise={{ ...activeExercises[currentExerciseIndex] }}
                                    onUpdateExercise={(updatedExercise) => updateExercise(currentExerciseIndex, updatedExercise)}
                                />
                            </>
                        ) 
                    )}
                </div>
                {canGoRight ? (
                    <button className="change-exercise-button" onClick={handleRight}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4L16 12L8 20" stroke="rgb(123, 104, 238)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                ) : (
                    <button className="invisible change-exercise-button">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 4L16 12L8 20" stroke="purple" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
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
                            const response = await fetch('https://musclememory-backend.onrender.com/api/completed_workouts/add', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(completed)
                            });
                            await response.json();
                            router.replace(`/review?workout=${JSON.stringify(completed)}`);
                        } catch (err) {
                            console.error(err);
                        }
                    } else {
                        router.replace(`/review?workout=${JSON.stringify(completed)}`);
                    }
                }}
            >
                FINISH
                </button>
        </div>
    );
}
