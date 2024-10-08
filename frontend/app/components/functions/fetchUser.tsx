

async function fetchUser() {
    const response = await fetch('https://musclememory-backend.onrender.com/api/user/profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${document.cookie.split(';')[1].split('=')[1]}`
        },
        body: JSON.stringify({ token: document.cookie.split(';')[0].split('=')[1] })
    });
    const data = await response.json();
    return data;
}

export default fetchUser;