import React from 'react';

const checkLogin = () => {
    return (typeof document !== 'undefined' && document.cookie.includes('user'));
}

export default checkLogin;