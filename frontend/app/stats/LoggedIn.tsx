'use client'

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import processStats from "../components/functions/processStats"
import VolumeBarChart from "../components/WorkoutBarChart"
import MuscleDistributionGraph from "../components/MuslceDistributionGraph"

export default function LoggedIn() {
    const [isLoading, setIsLoading] = useState(true)
    const [isGraphView, setIsGraphView] = useState(false)

    const stats = useRef<{
        totalWorkouts: number; totalSets: number; totalReps: number; totalVolume: number; monthlyStats: { [key: string]: { totalSets: number; totalReps: number; totalVolume: number; }; }; weeklyStats: { [key: string]: { totalSets: number; totalReps: number; totalVolume: number; }; };
        volumePerMuscle: { [key: string]: number; };
        setsPerMuscle: { [key: string]: number; };
        repsPerMuscle: { [key: string]: number; };
    } | null>(null)

    useEffect(() => {
        fetch(`https://musclememory-backend.onrender.com/api/completed_workouts/all/${document.cookie.split(';')[0].split('=')[1]}`)
            .then(res => res.json())
            .then(data => {
                stats.current = processStats(data)
                setIsLoading(false)
            })
            .catch(err => console.error(err))
    }, [])

    return (
        <> 
        
            {isLoading ? <p>Loading...</p> : (
                <div className={`statistics ${isGraphView ? 'w-[90%]' : ''}`}>
                    <h1>Statistics</h1>
                    <div className='statistics-info'>
                        {!stats.current ? <p className="empty-state">No data to show yet, but every great journey begins with a single step!</p> : (
                            isGraphView ? (
                                <div className='graph-container'>
                                    <VolumeBarChart weeklyStats={stats.current.weeklyStats} monthlyStats={stats.current.monthlyStats} />
                                    <MuscleDistributionGraph volumePerMuscle={stats.current.volumePerMuscle} repsPerMuscle={stats.current.repsPerMuscle} setsPerMuscle={stats.current.setsPerMuscle} />
                                </div>
                            ) : (
                                <div className="statistics-data">            
                                    <h1>Overall</h1>
                                    <div className="stats-boxes">
                                        <div className="stats-box">
                                            <h3 className="stats-value">{stats.current.totalWorkouts}</h3>
                                            <h3 className="stats-label">Total Workouts</h3>
                                        </div>
                                        <div className="stats-box">
                                            <h3 className="stats-value">{stats.current.totalSets}</h3>
                                            <h3 className="stats-label">Total Sets</h3>
                                        </div>
                                        <div className="stats-box">
                                            <h3 className="stats-value">{stats.current.totalReps}</h3>
                                            <h3 className="stats-label">Total Reps</h3>
                                        </div>
                                        <div className="stats-box">
                                            <h3 className="stats-value">{stats.current.totalVolume} kg</h3>
                                            <h3 className="stats-label">Total Volume</h3>
                                        </div>
                                    </div>
                                    <p>Keep up the great work! Your progress is being tracked here, so you can see how far you&apos;ve come and stay motivated on your fitness journey.</p>
                                </div>
                        ))}
                        <button 
                            className={`graph-toggle-button`} 
                            onClick={() => setIsGraphView(!isGraphView)}
                        >
                            {isGraphView ? "Hide Graphs" : "Show Graphs"}
                        </button>
                    </div>
                    <p className="statistics-redirect-text">Want to see previous workouts?</p>
                    <Link href="/history" className="statistics-button">H I S T O R Y</Link>
                </div>
            )}
        </>
    )
}