'use client'
import { useRouter } from 'next/navigation';

export default function Guest() {
    const router = useRouter();
    return (
        <div className="guest-screen">
            <p>
                Create an account to be able to view your workout history and access our full range of services!
            </p>
            <button className="start-btn-small" onClick={() => router.replace('/register')}>
                Create account
            </button>
        </div>
    )
}