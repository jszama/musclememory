'use client'
import { useRouter } from 'next/navigation';

export default function Guest() {
    const router = useRouter();
    return (
        <div className="guest-screen">
            <p>
                Create an account to be able to connect with other users and make friends!
            </p>
            <button className="start-btn-small" onClick={() => router.replace('/register')}>
                Create account
            </button>
        </div>
    )
}