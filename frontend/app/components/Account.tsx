import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import checkLogin from './functions/checkLogin';

export default function Account() {
    const [isSignedIn, setIsSignedIn] = useState(checkLogin());
    
    console.log('Account rendered');

    useEffect(() => {
        setIsSignedIn(document.cookie.includes('user'));
    }, []);

    return (
        <>
            {isSignedIn ?
                (<Link href='/account'><Image src="/user.png" alt="account-logo" height={64} width={64} /></Link>) :
                (<Link href='/login'><Image src="/user.png" alt="account-logo" height={64} width={64} /></Link>)
            }
        </>
    );
}
