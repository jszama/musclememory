import React, { useEffect, useState } from 'react';
import { ActiveExercise } from '../components/interfaces';

interface ExerciseScreenProps {
    exercise: ActiveExercise;
    onUpdateExercise: (updatedExercise: ActiveExercise) => void;
}

export default function ExerciseScreen({ exercise, onUpdateExercise }: ExerciseScreenProps) {
    const [sets, setSets] = useState([...exercise.sets]);
    const [reps, setReps] = useState([...exercise.reps]);
    const [weight, setWeight] = useState([...exercise.weight]);

    //const canUnilateral = exercise.exercise.resistance === 'Bodyweight' || exercise.exercise.resistance === 'Cable' || exercise.exercise.resistance === 'Machine' || exercise.exercise.resistance === 'Dumbbell';

    useEffect(() => {
        const updatedExercise = { ...exercise, sets, reps, weight };
        onUpdateExercise(updatedExercise);
    }, [sets, reps, weight]);

    const addSet = () => {
        setSets(prevSets => [...prevSets, prevSets.length + 1]);
        setReps(prevReps => [...prevReps, prevReps[prevReps.length - 1]]);
        setWeight(prevWeight => [...prevWeight, prevWeight[prevWeight.length - 1]]);
    }

    const removeSet = () => {
        if (sets.length > 1) {
            setSets(prevSets => prevSets.slice(0, -1));
            setReps(prevReps => prevReps.slice(0, -1));
            setWeight(prevWeight => prevWeight.slice(0, -1));
        }
    }

    const handleRepsChange = (index: number, value: number) => {
        setReps(prevReps => {
            const updatedReps = [...prevReps];
            updatedReps[index] = Math.floor(value);
            return updatedReps;
        });
    };

    const handleWeightChange = (index: number, value: number) => {
        setWeight(prevWeight => {
            const updatedWeight = [...prevWeight];
            updatedWeight[index] = value;
            return updatedWeight;
        });
    };

    return (
        <div className='exercise-body'>
            <section className='exercise-info-header'>
                <h2 className='text-center'> {exercise.exercise.name} </h2>
            </section>
            <div className='exercise-info-container'>
                <div className='exercise-header'>
                    <section className='set-display'>
                        <h3>Set</h3>
                    </section>
                    <div className='set-input'>
                        <section className='set-section'>
                            <p>Reps</p>
                        </section>
                        <section className='set-section'>
                            <p>Weight</p>
                        </section>
                    </div>
                </div>
                {sets.map((_, index) => (
                    <div className='exercise-stats' key={index}>
                        <section className='set-display'>
                            <p>{index + 1}</p>
                        </section>
                        <div className='set-input'>
                            <section className='set-section'>
                                <input
                                    type="number"
                                    value={reps[index] || ''}
                                    step="1"
                                    min="0"
                                    onChange={(event) => handleRepsChange(index, Math.max(0, Number(event.target.value)))}
                                />
                            </section>
                            <section className='set-section'>
                                <div className='flex flex-row gap-x-1 text-3'>
                                    <input
                                        type="number"
                                        value={weight[index] || ''}
                                        step="0.01"
                                        min="0"
                                        onChange={(event) => handleWeightChange(index, Math.max(0, Number(event.target.value)))}
                                    /> kg
                                </div>
                            </section>
                        </div>
                    </div>
                ))}
            </div>
            <div className='set-buttons'>
                <button className='bg-red-300' onClick={removeSet}>Remove set</button>
                <button className='bg-green-300' onClick={addSet}>Add set</button>
            </div>
        </div>
    );
}