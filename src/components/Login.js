import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { useAuth } from '../providers/AuthProvider';

export default function Login() {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            history.push('/');
        } else {
            history.push('/login');
        }
    }, [currentUser]);

    const handleAuth = async (e) => {
        e.preventDefault();

        setError('');
        await login(email, password)
            .then(() => {
                history.push("/")
            })
            .catch((err) => {
                console.log(err.message);
                // setError('Failed to create account')
            });
    }

    return (
        <div className="register-login">
            <br />
            <TextField
                className="user-input"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <TextField
                className="user-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <div style={{ margin: '20px' }}>
            <Button
                style={{ margin: '7px' }}
                variant="contained"
                color="primary"
                onClick={handleAuth}
            >
                Login
            </Button>
            <Button
                style={{ margin: '7px' }}
                variant="contained"
                color="primary"
                onClick={() => {history.push("/signup")}}
            >
                Sign Up
            </Button>
            </div>
        </div>
    )
}