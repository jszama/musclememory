
import { getUserIdFromCookie, getTokenFromCookie } from "../../utils/cookieUtils";

async function fetchUser() {
    const token = getTokenFromCookie();
    const userId = getUserIdFromCookie();

    if (!token || !userId) {
        throw new Error('Authentication required');
    }

    const response = await fetch('https://musclememory-backend.onrender.com/api/user/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ token: userId })
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch user data');
    }
    
    const data = await response.json();
    return data;
}

export default fetchUser;