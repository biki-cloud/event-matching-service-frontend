import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Home = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch(`${API_BASE_URL}/account/get_me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response);
            try {
                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }
                const data = await response.json();
                console.log(data);
                setUserInfo(data);
                // dataをローカルストレージに保存
                localStorage.setItem('account_id', JSON.stringify(data.id));
                localStorage.setItem('eventer_id', JSON.stringify(data.eventer.id).replace('"', '').replace('"', ''));
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                navigate('/signin'); // Redirect to /signin on authentication error
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div>
            <h1>Home</h1>
            {userInfo && (
                <div>
                    <p>ようこそ！ {userInfo.name}</p>
                    <p>email: {userInfo.email}</p>
                    <p>id: {userInfo.id}</p>
                </div>
            )}
            <Link to="/eventer/manage">イベンターはこちら</Link>
            <br></br><br></br>
            <Link to="/vendor/manage">出店者はこちら</Link>
        </div>
    );
};

export default Home;