import React from 'react';

interface Exercise {
    id: number;
    name: string;
    description: string;
  }

    const exercises: Exercise[] = [
        {
            id: 1,
            name: 'Bench Press',
            description: 'The bench press is a compound exercise that builds strength and muscle in the chest, shoulders, and triceps'
        },{
            id: 2,
            name: 'Ab Crunch',
            description: 'The bench press is a compound exercise that builds strength and muscle in the chest, shoulders, and triceps'
        },{
            id: 1,
            name: 'Bench Press',
            description: 'The bench press is a compound exercise that builds strength and muscle in the chest, shoulders, and triceps'
        },{
            id: 1,
            name: 'Bench Press',
            description: 'The bench press is a compound exercise that builds strength and muscle in the chest, shoulders, and triceps'
        },{
            id: 1,
            name: 'Bench Press',
            description: 'The bench press is a compound exercise that builds strength and muscle in the chest, shoulders, and triceps'
        }]

const groupedExercises: Record<string, Exercise[]> = exercises.sort((a, b) => a.name.localeCompare(b.name)).reduce((grouped, exercise) => {
    const letter = exercise.name[0].toUpperCase();
    if (!grouped[letter]) {
        grouped[letter] = [];
    }
    grouped[letter].push(exercise);
    return grouped;
}, {} as Record<string, Exercise[]>);

export default function ExerciseBank() {
    return (
        <main className="home-page">
            <div className="exercise-container">
                <input className="exercise-search" placeholder="Search entry" />
                <section className="exercise-bank">
                    <section className="search-filters">
                        <select>
                            <option value="">Muscle Group</option>
                            <option value="abs">Abs</option>
                            <option value="back">Back</option>
                            <option value="biceps">Biceps</option>
                            <option value="chest">Chest</option>
                            <option value="forearms">Forearms</option>
                            <option value="legs">Legs</option>
                            <option value="neck">Neck</option>
                            <option value="shoulders">Shoulders</option>
                            <option value="triceps">Triceps</option>
                        </select>

                        <select>
                            <option value="">Resistance Method</option>
                            <option value="barbell">Barbell</option>
                            <option value="bodyweight">Bodyweight</option>
                            <option value="cable">Cable</option>
                            <option value="dumbbell">Dumbbell</option>
                        </select>

                        <select>
                            <option value="">Bench Angle</option>
                            <option value="decline">Decline</option>
                            <option value="flat">Flat</option>
                            <option value="incline">Incline</option>
                        </select>
                    </section>
                    <section className="exercise-list">
                    {Object.entries(groupedExercises).map(([letter, exercises]) => (
                        <div className="exercise-block" key={letter}>
                        <h2>{letter}</h2>
                        {exercises.map((exercise) => (
                            <div className='exercise-card' key={exercise.name}>
                            <h3>{exercise.name}</h3>
                            <p className='exercise-info'>{exercise.description}</p>
                            </div>
                        ))}
                        </div>
                    ))}
                    </section>
                </section>
            </div>
        </main>
    );
}
