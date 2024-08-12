import Link from 'next/link'
import RegisterForm from './registerForm'

export default function RegisterPage() {
    return (
        <main className="login-page">
            <div className="register-box">
                <div className='login-content'>
                    <h1>Sign up</h1>
                    <RegisterForm />
                </div>
                <p className='text-4'>Already have an account? <Link className='redirect' href='/login'>Sign in</Link></p>
            </div>
        </main>
    )
}