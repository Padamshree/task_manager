import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { useAuth } from '../providers/AuthProvider';
import { Row } from 'react-bootstrap';
import { db } from '../firebase';

export default function Register() {
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register, currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            history.push('/');
        } else {
            history.push('/signup');
        }
    }, [currentUser]);
    
    const handleAuth = async (e) => {
        e.preventDefault();

        setError('');
        await register(email, password)
            .then((res) => {
                db.collection('users').doc(res.user.uid).set({
                    name: name,
                });
                history.push("/")
            })
            .catch((err) => {
                console.log(err.message);
                // setError('Failed to create account')
            });
    }

    return (
        <div className="Register">
            <br />
            <TextField
                className="user-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
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
                Sign Up
            </Button>
            <Button
                style={{ margin: '7px' }}
                variant="contained"
                color="primary" 
                onClick={() => {history.push("/login")}}
            >
                Login
            </Button>
            </div>
        </div>
    )
}
