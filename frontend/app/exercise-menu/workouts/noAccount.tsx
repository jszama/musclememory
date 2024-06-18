import { useRouter } from "next/navigation"

export default function NoAccount() {
    const router = useRouter();

    return (
        <div className='no-workouts'>
            <h1>To access this feature, please create an account. Your account will allow you to enjoy exclusive benefits and access our full range of services!</h1>
            <button onClick={() => router.replace('/register')}>Create Account</button>
        </div>
    )
}