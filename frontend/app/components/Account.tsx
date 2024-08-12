import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import checkLogin from './functions/checkLogin';

export default function Account() {
    const [isSignedIn, setIsSignedIn] = useState(checkLogin());
    const [href, setHref] = useState('/login'); 

    useEffect(() => {
        setIsSignedIn(document.cookie.includes('user'));
        setHref(isSignedIn ? '/account' : '/login');
    }, [isSignedIn]);

    return (
        <>
            <Link href={href}><Image src="/user.png" alt="account-logo" height={64} width={64} /></Link>
        </>
    );
}
