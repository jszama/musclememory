'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function BackButton() {
    const [isHomePage, setIsHomePage] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsHomePage(window.location.pathname === '/');
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <>
            {!isHomePage && !isLoading && (
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
