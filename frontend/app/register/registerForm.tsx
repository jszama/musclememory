'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

import checkLogin from '../components/functions/checkLogin';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

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
        const response = await fetch('http://localhost:3001/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();
        document.cookie = `user=${data.user._id                 }`;
        document.cookie = `token=${data.user.token}`;
    }

    const register = async (name: string, email: string, password: string, confirmPassword: string) => {
        validateInput(name, email, password, confirmPassword)
        
        await registerUser(name, email, password);

        setError('Account created successfully!');
        setTimeout(() => {}, 750);
        router.replace('/');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await register(name, email, password, confirmPassword);
        } catch (error) {
            setError((error as Error).message);
        }
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
            
            <p>{error}</p>

            <button type="submit">REGISTER</button>
        </form>
    )
}