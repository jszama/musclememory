import React, { useEffect, useState } from 'react';
import { Exercise } from '@/app/components/interfaces';

export default function ExerciseList() {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [search, setSearch] = useState('');
    const [muscle, setMuscle] = useState('');
    const [resistance, setResistance] = useState('');
    const [angle, setAngle] = useState('');

    const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
    const [groupedExercises, setGroupedExercises] = useState<Record<string, Exercise[]>>({});
    
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    const groupExercises = (filteredExercises: Exercise[]) => {

        const groupedExercises: Record<string, Exercise[]> = filteredExercises.sort((a, b) => a.name.localeCompare(b.name)).reduce((grouped, exercise) => {
            const letter = exercise.name[0].toUpperCase();
            if (!grouped[letter]) {
                grouped[letter] = [];
            }
            grouped[letter].push(exercise);
            return grouped;
        }, {} as Record<string, Exercise[]>);

        setGroupedExercises(groupedExercises);
    }

    const handleSearch = (search: string, muscle: string, resistance: string, angle: string) => {
        const filteredExercises = exercises.filter(exercise => 
            exercise.name.toLowerCase().includes(search.toLowerCase()) &&
            (muscle === '' || exercise.muscleGroup === muscle) &&
            (resistance === '' || exercise.resistance === resistance) &&
            (angle === '' || exercise.angle === angle)
        );
        setFilteredExercises(filteredExercises);
        groupExercises(filteredExercises);
    }

    const handleDescription = (exercise: Exercise) => {
        if (selectedExercise == exercise) {
            setSelectedExercise(null);
        } else {
            setSelectedExercise(exercise);
        }
    }

    useEffect(() => {
        fetch('https://musclememory-backend.onrender.com/api/exercises')
            .then(response => response.json())
            .then(data => {
                setExercises(data);
                setFilteredExercises(data);
                groupExercises(data);
            })
            .catch(error => console.error('Error fetching exercises:', error));
    } , []);

    return (
            <>
                <input name='searchEntry' className="exercise-search" placeholder="Search entry" onChange={(e) => {
                    setSearch(e.target.value);
                    handleSearch(e.target.value, muscle, resistance, angle);
                }} />
                <section className="exercise-bank">
                    <section className="search-filters">
                        <select name='muscle' onChange={(e) => {
                            setMuscle(e.target.value) 
                            handleSearch( search, e.target.value, resistance, angle);
                        }}>
                            <option value="">Muscle Group</option>
                            <option value="Abs">Abs</option>
                            <option value="Back">Back</option>
                            <option value="Biceps">Biceps</option>
                            <option value="Chest">Chest</option>
                            <option value="Forearms">Forearms</option>
                            <option value="Legs">Legs</option>
                            <option value="Neck">Neck</option>
                            <option value="Shoulders">Shoulders</option>
                            <option value="Triceps">Triceps</option>
                        </select>

                        <select name='resistance' onChange={(e) => {
                            setResistance(e.target.value);
                            handleSearch( search, muscle, e.target.value, angle);
                        }}>
                            <option value="">Resistance Method</option>
                            <option value="Barbell">Barbell</option>
                            <option value="Bodyweight">Bodyweight</option>
                            <option value="Cable">Cable</option>
                            <option value="Dumbbell">Dumbbell</option>
                        </select>

                        <select name='angle' onChange={(e) => {
                            setAngle(e.target.value);
                            handleSearch( search, muscle, resistance, e.target.value);
                        }}>
                            <option value="">Bench Angle</option>
                            <option value="Decline">Decline</option>
                            <option value="Flat">Flat</option>
                            <option value="Incline">Incline</option>
                        </select>
                    </section>
                
                    <section className="exercise-list">
                        {Object.entries(groupedExercises).map(([letter, exercises]) => (
                            <div className="exercise-block" key={letter}>
                                <h2>{letter}</h2>
                                {exercises.map((exercise) => (
                                    <div className={`exercise-card ${selectedExercise === exercise ? 'exercise-selected' : ''}`} key={exercise.name} onClick={() => handleDescription(exercise)}>
                                        <h3>{exercise.name}</h3>
                        
                                        {selectedExercise === exercise &&
                                            <p className='exercise-info'>{exercise.description}</p>
                                        }
                                    </div>
                                ))}
                            </div>
                        ))}
                    </section>
                </section>
            </>
    );
}