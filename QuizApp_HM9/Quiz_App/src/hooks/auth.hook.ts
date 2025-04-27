import { useNavigate } from 'react-router';

const useAuth = () => {
    const navigate = useNavigate();

    const readUser = () => {
        const strData = localStorage.getItem('user');
        return strData ? JSON.parse(strData) : null;
    }

    const login = (username: string, password: string) => {
        if (username.toLowerCase() === 'rand' && password === '1234') {
            const user = {
                username,
                role: 'admin'
            };
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/start')
        } else if (username.toLowerCase() === 'other' && password === '1234') {
            const user = {
                username,
                role: 'user'
            };
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/start');
        }
        else {
            alert('Wrong username or password!');
            localStorage.removeItem('username');
        }
    }

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/');
    }

    return {
        login,
        logout,
        readUser,
        user: readUser()
    }
}

export default useAuth;