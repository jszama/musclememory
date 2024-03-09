'use client';

import Image from 'next/image';
import React from 'react';

export default function BackButton() {
    return (
        <Image className='back-btn' src="/back.png" alt="back-button" width={64} height={64} onClick={() => window.history.back()}/>
    );
}