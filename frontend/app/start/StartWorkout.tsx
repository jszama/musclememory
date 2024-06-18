import React, { useEffect, useState } from 'react';
import { Workout, Exercise, CompletedWorkout, ActiveExercise } from '../components/interfaces';

import ExercisePicker from '../exercise-menu/workouts/create/exercisePicker';
import ExerciseScreen from './exerciseScreen';
import { useRouter } from 'next/navigation';

interface WorkoutPickerProps {
    pickedWorkout: Workout[]    
}

export default function StartWorkout({ pickedWorkout }: WorkoutPickerProps) {
    const router = useRouter();
    const selectedWorkout = pickedWorkout[0] as Workout;
    
    const [completeWorkout, setCompleteWorkout] = useState({} as CompletedWorkout);

    const [addExercise, setAddExercise] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [reset, setReset] = useState(false);

    const [canGoLeft, setCanGoLeft] = useState(false);
    const [canGoRight, setCanGoRight] = useState(false);

    const [activeExercises, setActiveExercises] = useState([] as ActiveExercise[]);

    const [exerciseComponents, setExerciseComponents] = useState<JSX.Element[]>([]);    

    useEffect(() => {
        selectedWorkout.exercises.forEach((exercise: Exercise) => {
            activeExercises.push({
                exercise: exercise,
                sets: [1],
                reps: [0],
                weight: [0]
            });
        });

        activeExercises.forEach((activeExercise: ActiveExercise) => {
            exerciseComponents.push(
                <ExerciseScreen key={currentExerciseIndex} exercise={activeExercise} doneExercises={completeWorkout} />
            );
            setCurrentExerciseIndex(currentExerciseIndex + 1);
        });
    }, []);

    useEffect(() => {
        const checkExercise = () => {
            if (currentExerciseIndex === 0) {
                setCanGoLeft(false);
            }

            if (selectedWorkout.exercises[currentExerciseIndex] === undefined) {
                setShowButton(true);
                setCanGoRight(false);
            } else {
                setShowButton(false);
                setCanGoLeft(true);
                setCanGoRight(true);
            }
        }
        checkExercise();    
    }, [currentExerciseIndex, selectedWorkout.exercises]);

    useEffect(() => {
        if (selectedWorkout.exercises[currentExerciseIndex] === undefined) {
            setShowButton(true);
            setCanGoRight(false);
        } else {
            setShowButton(false);
            setCanGoLeft(true);
            setCanGoRight(true);
        }
    }, [reset]);

    const handleLeft =  () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex(currentExerciseIndex - 1);
        }
    }

    const handleRight = () => {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
    }

    const addExerciseBody = (
        <ExercisePicker exercisesPicked={selectedWorkout.exercises} pickMode={[true]} setPickMode={async (mode: boolean) => { 
            await activeExercises.push({
                exercise: selectedWorkout.exercises[currentExerciseIndex],
                sets: [1],
                reps: [0],
                weight: [0]
            });
            await exerciseComponents.push(
                <ExerciseScreen key={currentExerciseIndex} exercise={activeExercises[currentExerciseIndex]} doneExercises={completeWorkout} />
            );
            setAddExercise(false);
            setReset(!reset);
        }} />
    );

    const addExerciseButton = (
        <button className="add-exercise-large" onClick={() => setAddExercise(!addExercise)}>+</button>
    );

    return (
        <div className="start-workout-container">
            <div className='top-row'>
                <h1 className='absolute'>
                    {selectedWorkout.name}
                </h1>
                <button onClick={() => router.replace('/')} className='ml-auto'>
                    Exit
                </button>
            </div>
            <div className='flex flex-row min-w-full min-h-[70%] justify-center'>
                { canGoLeft ?
                    <button className='change-exercise-button' onClick={() => handleLeft()}>
                        Left
                    </button>
                    :
                    <button className='invisible change-exercise-button'>Left</button>
                }
                <div className='body'>
                    {showButton ?
                        !addExercise ? (
                            <div className='add-exercise-body' >
                                {addExerciseButton}
                            </div>
                            ) : (
                            <div className='exercise-container my-1 border-0 justify-start'>
                                {addExerciseBody}
                            </div>
                        )
                        :
                        <div >
                            <>
                                {exerciseComponents[currentExerciseIndex]}
                            </>
                        </div>
                    }
                </div>
                { canGoRight ?
                    <button className='change-exercise-button' onClick={() => handleRight()}>
                        Right
                    </button>
                    :
                    <button className='invisible change-exercise-button'>Right</button>
                }
            </div>
            <button className='finish-workout-button'
                onClick={async () => {
                    await setCompleteWorkout({
                        _id: selectedWorkout._id,
                        name: selectedWorkout.name,
                        exercises: activeExercises
                    } as CompletedWorkout);

                    if (localStorage.getItem('user') !== null) {
                        fetch('http://localhost:3001/api/completed_workouts/add', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                _id: selectedWorkout._id,
                                name: selectedWorkout.name,
                                exercises: activeExercises
                            })
                        })
                        .then(res => res.json())
                        .then(data => console.log(data))
                        .catch(err => console.error(err))
                    }    
                    router.push(`/review?workout=${JSON.stringify(completeWorkout)}`);              
            }}>
                Finish
            </button>
        </div>
    )
}