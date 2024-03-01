'use client'

import { useState } from 'react';
import Image from 'next/image';    
import Link from 'next/link';

export default function Header() {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="header">
            <div className="hamburger-menu" onClick={toggleDropdown}>
                <div className='hamburger-icon'>
                    <Image src={"/hamburger.png"} alt="hamburger-menu" width={64} height={64}/>
                </div>
                {showDropdown && (
                    <ul className="dropdown-menu">
                        <li className='dropdown-menu-item'><Link href='/get-started'>Get Started</Link></li>
                        <li className='dropdown-menu-item'><Link href='/contact-us'>Contact Us</Link></li>
                        <li className='dropdown-menu-item'><Link href='/about-us'>About Us</Link></li>
                    </ul>
                )}
            </div>
            <div className="header-title">
                <Link href='/'><h1>MuscleMemory</h1></Link>
            </div>
            <div className="account-icon">
                <Link href='account'><Image src="/user.png" alt="account-logo" height={64} width={64}/></Link>
            </div>
        </nav>
    );
}