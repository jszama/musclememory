'use client'

import Image from 'next/image'; 
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() =>
    setIsLoggedIn(document?.cookie.includes('token'))
  , []);
  
  if (!isLoggedIn && typeof window !== 'undefined' && localStorage.getItem('token')) {
    document.cookie = `user=${localStorage.getItem('user')}`;
    document.cookie = `token=${localStorage.getItem('token')}`;
    setIsLoggedIn(true);
  }

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
