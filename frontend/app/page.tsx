'use client'

import Image from 'next/image'; 
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { isUserLoggedIn, setCookie } from './utils/cookieUtils';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLoggedIn(isUserLoggedIn());
    }
  }, []);
  
  useEffect(() => {
    if (!isLoggedIn && typeof window !== 'undefined' && localStorage.getItem('token')) {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        // Validate user ID format before setting cookie
        if (/^[0-9a-fA-F]{24}$/.test(storedUser)) {
          setCookie('user', storedUser);
          setCookie('token', storedToken);
          setIsLoggedIn(true);
        } else {
          console.error('Invalid user ID in localStorage, clearing storage');
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
    }
  }, [isLoggedIn]);

  return (
    <main className="home-page ">
      <div className="btn-container">
        <section className='start-btn'>
          <Link href='/start'>
            START
          </Link>
        </section>
        
        <Link className='app-btn' href='/exercise-menu'>
            <Image src="/workouts.png" alt="Workouts" width={72} height={72} />
        </Link>

        <Link className='app-btn' href='/stats'>
          <Image src="/statistics.png" alt="Statistics" width={72} height={72}/>
        </Link>
        <Link className='app-btn' href='/history'>
          <Image src="/history.png" alt="History" width={72} height={72}/>
        </Link>
        <Link className='app-btn' href='/friends'>
          <Image src="/friends.png" alt="Friends" width={96} height={96}/>
        </Link>
      </div>
    </main>
  );
}
