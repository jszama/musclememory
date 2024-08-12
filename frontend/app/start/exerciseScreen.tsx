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

    useEffect(() => {
        const updatedExercise = { ...exercise, sets, reps, weight };
        onUpdateExercise(updatedExercise);
    }, [sets, reps, weight]);

    const addSet = () => {
        setSets(prevSets => [...prevSets, prevSets.length + 1]);
        setReps(prevReps => [...prevReps, 0]);
        setWeight(prevWeight => [...prevWeight, 0]);
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
            updatedReps[index] = value;
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
            <h2 className='text-center'> {exercise.exercise.name} </h2>
            <div className='exercise-info-container'>
                {sets.map((_, index) => (
                    <div className='exercise-header' key={index}>
                        <section>
                            <h3>Set</h3>
                            <p>{index + 1}</p>
                        </section>
                        <div className='set-input'>
                            <section className='set-section'>
                                <p>Reps</p>
                                <input
                                    type="number"
                                    value={reps[index] || ''}
                                    onChange={(event) => handleRepsChange(index, Number(event.target.value))}
                                />
                            </section>
                            <section className='set-section'>
                                <p>Weight</p>
                                <div className='flex flex-row gap-x-1 text-3'>
                                    <input
                                        type="number"
                                        value={weight[index] || ''}
                                        onChange={(event) => handleWeightChange(index, Number(event.target.value))}
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