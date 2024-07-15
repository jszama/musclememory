'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../components/interfaces'; 

import checkLogin from '../components/functions/checkLogin';

export default function AccountPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState({} as User);
    const router = useRouter();

    const fetchUser = () => {
        fetch('http://localhost:3001/api/user/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${document.cookie.split(';')[1].split('=')[1]}`
            },
            body: JSON.stringify({ token: document.cookie.split(';')[0].split('=')[1] })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setUser(data);
            setIsLoading(false);
        });
    }
        
    useEffect(() => {
        console.log(document.cookie)
        if (!checkLogin()) {
            router.replace('/login');
        } else {
            fetchUser();
        }
    }, [router]);

    return (
        <main className='account-page'>
                <div className='account-info'>
                    <h1>Account</h1>
                    {
                        isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <>
                                <p>Name: {user.name}</p>
                                <p>Email: {user.email}</p>
                            </>
                        )
                    }
                
                <button onClick={() => {
                    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                    document.cookie = `token; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    router.replace('/login');
                }}>Logout</button>

            </div>
        </main>
    );
}