import React, { useState } from 'react';
import { CompletedWorkout, ActiveExercise } from '../components/interfaces';

interface ExerciseScreenProps {
    exercise: ActiveExercise;
    doneExercises: CompletedWorkout;
}

export default function ExerciseScreen({ exercise, doneExercises }: ExerciseScreenProps) {

    const [reps, setReps] = useState(exercise.reps);
    const [weight, setWeight] = useState(exercise.weight);

    const addSet = () => {
        exercise.sets.push(exercise.sets.length + 1);
        setReps([...reps, 0]);
        exercise.reps = [...reps, 0];
        setWeight([...weight, 0]);
        exercise.weight = [...weight, 0];
    }

    const removeSet = () => {
        if (exercise.sets.length > 1) {
            exercise.sets.pop();
            setReps(reps.slice(0, reps.length - 1));
            setWeight(weight.slice(0, weight.length - 1));
        }
    }

    const handleRepsChange = (index: number, value: number) => {
        const updatedReps = [...reps];
        updatedReps[index] = value;
        setReps(updatedReps);
        exercise.reps = updatedReps;
    };

    const handleWeightChange = (index: number, value: number) => {
        const updatedWeight = [...weight];
        updatedWeight[index] = value;
        setWeight(updatedWeight);
        exercise.weight = updatedWeight;
    };

    return (
        <div className='exercise-body'>
            <h2 className='text-center text-8'> { exercise.exercise.name } </h2>
            <div className='exercise-info-container'>
                {Array.from({ length: exercise.sets.length}).map((_, index) => (
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
                                    value={reps[index]}
                                    onChange={(event) => handleRepsChange(index, Number(event.target.value))}
                                />
                            </section>
                            <section className='set-section'>
                                <p>Weight</p>
                                <div className='flex flex-row gap-x-1 text-3'>
                                    <input 
                                        type="number"
                                        value={weight[index]}
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
