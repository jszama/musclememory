'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import checkLogin from '../components/functions/checkLogin';
import toast from 'react-hot-toast';
import { setCookie } from '../utils/cookieUtils';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (checkLogin()) {
            router.replace('/');
        }
    }, [router])

    const validName = (name: string) => {
        if (!name || name.length > 320 || name.length < 2) {
            return false;
        }
        return true;
    }

    const validEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email || email.length > 320 || email.length < 6) {
            return false;
        }
        return re.test(email);
    }

    const validPassword = (password: string) => {
        if (password.includes(' ') || !password) {
            return false;
        }
        return password.length >= 6;
    }

    const validConfirmPassword = (password: string, confirmPassword: string) => {
        return password === confirmPassword;
    }

    const validateInput = (name: string, email: string, password: string, confirmPassword: string) => {
        if (!validName(name) || !validEmail(email) || !validPassword(password) || !validConfirmPassword(password, confirmPassword)) {
            throw new Error('Please fill in all fields');
        }
    }

    const registerUser = async (name: string, email: string, password: string) => {
        try {
            setLoading(true);
            const response = await fetch(`https://musclememory-backend.onrender.com/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
            })

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            toast.success(data.message);
            setCookie('user', data.user._id);
            setCookie('token', data.user.token);

            router.replace('/');
        } catch (error: any) {
            toast.error(error.message || 'An error occurred');
            setLoading(false);
        }
    }

    const register = async (name: string, email: string, password: string, confirmPassword: string) => {
        validateInput(name, email, password, confirmPassword)
        
        await registerUser(name, email, password);

        setLoading(false);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        register(name, email, password, confirmPassword);
    }

    return (
        <form className='register-form' onSubmit={handleSubmit}>
            <input type="text" id="name" name="name" placeholder='Name' required
                onChange={
                    (e) => setName(e.target.value)
            }/>
            <input type="email" id="email" name="email" required placeholder='Email' onChange={
                (e) => setEmail(e.target.value)
            }/>
            <input type="password" id="password" name="password" placeholder='Password' required onChange={ 
                (e) => setPassword(e.target.value)
            } />
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm password' required onChange={
                (e) => setConfirmPassword(e.target.value)
            } />
            
            <p className='error'>{error}</p>

            {/* Ternary operator to show loading state */}
            <button type="submit" disabled={loading} className={`${loading} ? 'cursor-now-allowed': 'cursor-pointer'`}>{loading ? 'Loading...' : 'Register'}</button>
        </form>
    )
}