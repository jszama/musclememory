import Link from 'next/link'
import RegisterForm from './registerForm'

export default function RegisterPage() {
    return (
        <main className="login-page">
            <div className="login-box h-[556px]">
                <div>
                    <h1>Sign up</h1>
                    <RegisterForm />
                </div>
                <p>Already have an account? <Link className='redirect' href='/login'>Sign in</Link></p>
            </div>
        </main>
    )
}