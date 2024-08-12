interface Workout {
    _id: string;
    name: string;
    exercises: Exercise[];
}

interface Exercise {
    _id: string;
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
    bio: string;
    profilePicture: string;
}

interface ActiveExercise {
    exercise: Exercise;
    sets: number[];
    reps: number[];
    weight: number[];
}

interface CompletedWorkout {
    _id: string;
    user_id: string;
    name: string;
    exercises: ActiveExercise[];
    date: string;
}

export type { Workout, Exercise, User, ActiveExercise, CompletedWorkout };