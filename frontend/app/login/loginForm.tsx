'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import checkLogin from '../components/functions/checkLogin'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (checkLogin()) {
            router.replace('/account')
            return;
        }
    }, [])

    const validateInput = (email: string, password: string) => {
        if (!email || !password) {
            throw new Error('Please fill in all fields')
        }
    }

    const loginUser = async () => {
        const response = await fetch('http://localhost:3001/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, remember })
        });

        const data = await response.json();
        if (!data || !data.user || !data.user.token) {
            throw new Error('Invalid email or password');
        }
        document.cookie = `user=${data.user._id}`;
        document.cookie = `token=${data.user.token}`;
    }

    const login = async (email: string, password: string, remember: boolean) => {
        validateInput(email, password);

        await loginUser();
        router.replace('/')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await login(email, password, remember)
        } catch (err) {
            setError((err as Error).message)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Email' onChange={
                (e) => setEmail(e.target.value.trim())
            } required/>
            <input type='password' placeholder='Password' onChange={
                (e) => setPassword(e.target.value.trim())
            } required />

            <p className='error'>{error}</p>
            <input type='checkbox' id='remember' onChange={ (e) => setRemember(e.target.checked)}/>
            <button type="submit">CONTINUE</button>                
        </form>
    )
}