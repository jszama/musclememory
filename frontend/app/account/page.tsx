'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '../components/interfaces'; 
import checkLogin from '../components/functions/checkLogin';
import { profile } from 'console';
import Link from 'next/link';

export default React.memo(function AccountPage() {
    const [user, setUser] = useState({} as User);
    const [isEditing, setIsEditing] = useState(false);
    const [changedBio, setChangedBio] = useState(false);
    const [error, setError] = useState('');
    const [profilePicture, setProfilePicture] = useState(''); 
    const [friendCount, setFriendCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = document.cookie.split(';')[1]?.split('=')[1];
                if (!token) throw new Error('No token found');
    
                const [userResponse, friendsResponse, s3Response] = await Promise.all([
                    fetch('http://localhost:3001/api/user/profile', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                    }),
                    fetch(`http://localhost:3001/api/friends/${document.cookie.split(';')[0].split('=')[1]}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }),
                    fetch(`https://musclememory-profilepictures.s3.amazonaws.com/${document.cookie.split(';')[0].split('=')[1]}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        mode: 'cors',
                        referrerPolicy: 'no-referrer-when-downgrade',
                    })
                ]);
    
                if (!userResponse.ok) throw new Error('Failed to fetch user profile');
                const userData = await userResponse.json();
    
                if (!friendsResponse.ok) throw new Error('Failed to fetch friends count');
                const friendsData = await friendsResponse.json();
    
                let profilePictureUrl = '';
                if (s3Response.ok) {
                    const s3Data = await s3Response.blob();
                    profilePictureUrl = URL.createObjectURL(s3Data);
                    setProfilePicture(profilePictureUrl);
                }
                setUser(userData);
                setFriendCount((prevCount) => prevCount !== friendsData.length ? friendsData : prevCount);
            } catch (e: any) {
                setError(e.message || 'An error occurred');
            }
        };
    
        if (!checkLogin()) {
            router.replace('/login');
        } else {
            fetchUserData();
        }
    }, []);
    

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length > 50) {
            setError('Bio exceeds 50 character limit.');
            return;
        }
        if (e.target.value === user.bio) {
            return;
        }
        setUser(prevUser => ({ ...prevUser, bio: e.target.value }));
        setChangedBio(true);
    };

    const handleEditButton = async () => {
        if (isEditing && changedBio) {
            try {
                const token = document.cookie.split(';')[1].split('=')[1]

                const response = await fetch('http://localhost:3001/api/user/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ token: document.cookie.split(';')[0].split('=')[1], bio: user.bio })
                });

                if (!response.ok) throw new Error('Failed to update bio');
                const data = await response.json();
                setError('Bio updated.');
                setChangedBio(false);
            } catch (error: any) {
                setError(error.message || 'An error occurred during the request.');
                console.error(error);
            } finally {
                setIsEditing(false);
            }
        } else {
            setIsEditing(!isEditing);
        }
    };
    
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setError('No file selected.');
            return;
        }
    
        if (file.size > 5 * 1024 * 1024) {
            setError('File size exceeds 5MB limit.');
            return;
        }
    
        const formData = new FormData();
        formData.append('profilePic', file);
    
        try {
            const token = document.cookie.split(';')[1]?.split('=')[1];
            if (!token) throw new Error('No token found.');
    
            const response = await fetch('http://localhost:3001/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
    
            if (!response.ok) throw new Error('Failed to update profile picture');
            const data = await response.json();
            setError('Profile picture updated.');
        } catch (error: any) {
            setError(`An error occurred during the request: ${error.message}`);
            console.error(error);
        }
    };
    

    return (
        <main className='account-page'>
            <div className='account-info'>
                        <section className='account-top-section'>
                            <div className='account-details'>
                                <h1 className='account-info-title'><span>{user.name}</span>, looking good!</h1>
                                <p className='account-info-email'>{user.email}</p>
                                <div className='account-bio-box'>
                                    {isEditing ? (
                                        <textarea
                                            className='account-bio'
                                            value={user.bio}
                                            onChange={handleBioChange}
                                            autoFocus
                                            style={{ resize: 'vertical' }}
                                        />
                                    ) : (
                                        <p className='account-bio'>{user.bio}</p>
                                    )}
                                </div>
                                <div>
                                    <button className='account-edit-bio-btn' onClick={handleEditButton}>EDIT BIO</button>
                                    <p className='account-error-text'>{error}</p>
                                </div>
                            </div>
                            <div className='account-profile-picture-box'>
                                <Image
                                    className='account-profile-picture'
                                    src={profilePicture || '/profile.png'}
                                    alt="Profile Picture"
                                    height={256}
                                    width={256}
                                />
                                <div className='upload-overlay'>
                                    <input id='profile-picture-upload' type='file' accept='image/*' onChange={handleImageUpload} />
                                </div>
                            </div>
                        </section>
                        <section className='account-bottom-section'>
                        <div className='account-info-btn-box'>
                            <Link className='app-btn' href='/friends'>
                                <Image src="/friends.png" alt="Friends" width={96} height={96}/>
                            </Link>                            
                            <Link className='app-btn' href='/stats'>
                                <Image src="/statistics.png" alt="Statistics" width={72} height={72}/>
                            </Link>
                        </div>
                        <button className='account-info-logout-btn' onClick={() => {
                        document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
                        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                        localStorage.removeItem('user');
                        localStorage.removeItem('token');
                        router.replace('/login');
                    }}>LOGOUT</button>
                </section>
            </div>
        </main>
    );
});
