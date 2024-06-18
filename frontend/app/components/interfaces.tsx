interface Workout {
    _id: string;
    name: string;
    exercises: Exercise[];
}

interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
    resistance: string;
    angle: string;
    description: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
}

interface ActiveExercise {
    exercise: Exercise;
    sets: number[];
    reps: number[];
    weight: number[];
}

interface CompletedWorkout {
    _id: string;
    name: string;
    exercises: ActiveExercise[];
}

export type { Workout, Exercise, User, ActiveExercise, CompletedWorkout };