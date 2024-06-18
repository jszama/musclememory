import Link from 'next/link'
import LoginForm from './loginForm'

export default function LoginPage() {
    return (
        <main className="login-page">
            <div className="login-box">
                <div>
                    <h1>Sign in</h1>
                    <LoginForm />
                </div>
                <p>Don&apos;t have an account? <Link className='redirect' href='/register'>Sign up</Link></p>
            </div>
        </main>
    )
}