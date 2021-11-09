import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Register = () => {
    const [ status, setStatus ] = useState({});
    const [ userDTO, setUserDTO ] = useState({
        "username": "",
        "password": ""
    });

    const register = async (username, password) => {
        axios({
            method: 'post',
            url: 'http://localhost:5000/api/v1/auth/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "username": username,
                "password": password
            })
        })
            .then((res) => {
                setStatus(res.data);
            })
            .catch((error) => {
                setStatus({
                    "status": "Denied",
                    "message": "User already registered"
                })
            });
    }

    const handleChange = (event) => {
        const { value, id } = event.target;
        setUserDTO(prev => ({...prev, [id]:value}));
    }

    const handleSubmit = (event) => {
        register(userDTO.username, userDTO.password);
        event.preventDefault();
    }

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            
            mounted.current = true;
        } else {
            console.log(status);
        }
    }, [status])

    return (
        <div>
            <h1>
                Register Page
            </h1>
            <form style={{display: "flex", flexDirection: "column"}} onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={userDTO.username} onChange={(event) => handleChange(event)} placeholder="username" />
                <label htmlFor="password">Password</label>
                <input type="text" id="password" value={userDTO.password} onChange={(event) => handleChange(event)} placeholder="password" />
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;
