'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function BackButton() {
    const [isHomePage, setIsHomePage] = useState(false);

    useEffect(() => {
        setIsHomePage(window.location.pathname === '/');
    }, []);

    return (
        <>
            {!isHomePage && (
                <Image
                    className='back-btn'
                    src="/back.png"
                    alt="back-button"
                    width={64}
                    height={64}
                    onClick={() => window.history.back()}
                />
            )}
        </>
    );
}
