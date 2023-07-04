import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogOut() {
    let navigate = useNavigate();

    useEffect(() => {
        fetch('/auth/logout')
            .then(res => res.json())
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err))
    }, [navigate]);

    return null; // or return a loading indicator or status message
}

export default LogOut;
