import Link from "next/link"

export default function Workouts() {
    return (
        <main className="home-page">
            <div className="exercise-menu">
                <Link href='/exercise-menu/exercise-bank'><h1>Exercise Bank</h1></Link>
                <Link href='/exercise-menu/workouts'><h1>Workouts</h1></Link>
            </div>
        </main>
    );
}
