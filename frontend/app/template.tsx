import React from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
    console.log('ParentComponent rendered');
    
    return (
        <> 
            {children}
        </>   
    )
}