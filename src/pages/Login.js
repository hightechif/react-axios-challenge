import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Form from '../components/Form';
import  { useNavigate } from 'react-router-dom';
import { login } from '../store/actions/login';

const StyledDiv = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 0 5%;
    h1 {
        margin-bottom: 10px;
    }
    .form__container {
        margin: 0 auto;
        padding: 20px 30%;
        box-sizing: border-box;
    }
`

const Login = () => {
    const [ userDTO, setUserDTO ] = useState({
        "username": "",
        "password": ""
    });
    const [ isLoginSuccess, setIsLoginSuccess ] = useState(true);
    let navigate = useNavigate();

    const handleChange = (event) => {
        const { value, id } = event.target;
        setUserDTO(prev => ({...prev, [id]:value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const postLogin = await login(userDTO.username, userDTO.password);
            const { data } = postLogin;
            localStorage.setItem('ACCESS_TOKEN', data.token);
            setIsLoginSuccess(true);
            window.location.reload();
        } catch(e) {
            setIsLoginSuccess(false);
        }
    }

    useEffect(() => {
        const getToken = window.localStorage.getItem("ACCESS_TOKEN") ?? null;
        if (getToken) {
            navigate("/");
        }
        return () =>{
            // do componentWillUnmount
        }
    })

    return (
        <StyledDiv>
            <div className="form__container">
                <h1 className="uppercase font-bold text-gray-700">Login Page</h1>
                <Form biodata={userDTO} handleChange={handleChange} handleSubmit={handleSubmit} isRegistered={true} isLoginSuccess={isLoginSuccess} />
            </div>
        </StyledDiv>
    )
}

export default Login;
