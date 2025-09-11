'use client';

import { memo } from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

function BackButton() {
    const router = useRouter();
    const pathname = usePathname();
    const isHomePage = (pathname === '/');

    return (
        !isHomePage && 
            <div className='back-button'>
                <Image
                    className='back-btn'
                    src="/back.png"
                    alt="back-button"
                    width={64}
                    height={64}
                    onClick={() => {
                        router.back();
                    }}
                />
            </div>
    );
}

export default memo(BackButton);