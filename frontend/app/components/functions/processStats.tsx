import { CompletedWorkout } from "../interfaces"

const processStats = (completedWorkouts: CompletedWorkout[]) => {
    let totalWorkouts = completedWorkouts.length
    
    let totalSets = 0
    let totalReps = 0
    let totalVolume = 0

    const monthlyStats: { [key: string]: { totalSets: number, totalReps: number, totalVolume: number, totalWorkouts: number } } = {}
    const weeklyStats: { [key: string]: { totalSets: number, totalReps: number, totalVolume: number, totalWorkouts: number } } = {}

    const setsPerMuscle: { [key: string]: number } = {}
    const repsPerMuscle: { [key: string]: number } = {}
    const volumePerMuscle: { [key: string]: number } = {}

    for (let workout of completedWorkouts) {
        const workoutDate = new Date(workout.date)
        const month = `${workoutDate.getMonth() + 1}-${workoutDate.getFullYear()}`
        const startOfWeek = new Date(workoutDate.setDate(workoutDate.getDate() - workoutDate.getDay() + 1))
        const endOfWeek = new Date(workoutDate.setDate(workoutDate.getDate() - workoutDate.getDay() + 8))
        const week = `${startOfWeek.getDate()}-${endOfWeek.getDate()}/${startOfWeek.getMonth() + 1}/${startOfWeek.getFullYear().toString().slice(-2)}`

        if (!monthlyStats[month]) {
            monthlyStats[month] = { totalSets: 0, totalReps: 0, totalVolume: 0, totalWorkouts: 0 }
        }
        if (!weeklyStats[week]) {
            weeklyStats[week] = { totalSets: 0, totalReps: 0, totalVolume: 0, totalWorkouts: 0 }
        }

        for (let exercise of workout.exercises) {
            if (!setsPerMuscle[exercise.exercise.muscleGroup]) {
                setsPerMuscle[exercise.exercise.muscleGroup] = 0
                repsPerMuscle[exercise.exercise.muscleGroup] = 0
                volumePerMuscle[exercise.exercise.muscleGroup] = 0
            }
            
            totalWorkouts += 1
            totalSets += exercise.sets.length
            monthlyStats[month].totalSets += exercise.sets.length
            weeklyStats[week].totalSets += exercise.sets.length

            for (let i = 0; i < exercise.sets.length; i++) {
                totalVolume += exercise.reps[i] * exercise.weight[i]
                totalReps += exercise.reps[i]

                monthlyStats[month].totalVolume += exercise.reps[i] * exercise.weight[i]
                monthlyStats[month].totalReps += exercise.reps[i]

                weeklyStats[week].totalVolume += exercise.reps[i] * exercise.weight[i]
                weeklyStats[week].totalReps += exercise.reps[i]

                setsPerMuscle[exercise.exercise.muscleGroup] += 1
                repsPerMuscle[exercise.exercise.muscleGroup] += exercise.reps[i]
                volumePerMuscle[exercise.exercise.muscleGroup] += exercise.reps[i] * exercise.weight[i]
            }
        }
        monthlyStats[month].totalWorkouts += 1
        weeklyStats[week].totalWorkouts += 1
    }

    return { totalWorkouts, totalSets, totalReps, totalVolume, monthlyStats, weeklyStats, setsPerMuscle, repsPerMuscle, volumePerMuscle }
}
    
export default processStats;