import { useState, useEffect, useRef } from 'react';
import  { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authActions from '../../store/actions/authActions';
import Form from '../../components/Form';
import styled from 'styled-components';

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
    const [isLoginSuccess, setIsLoginSuccess] = useState(true);
    const mounted = useRef()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const handleChange = (event) => {
        const { value, id } = event.target;
        setUserDTO(prev => ({...prev, [id]:value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userDTO.username === "" || userDTO.password === "") {
            setIsLoginSuccess(false);
        } else {
            dispatch(authActions.login(userDTO.username, userDTO.password));
        }
    }

    useEffect(() => {
        if (!mounted.current) {
            // do componentDidMount
            dispatch(authActions.init());
            mounted.current = true;
        }
        const getToken = window.localStorage.getItem("ACCESS_TOKEN") ?? null;
        if (getToken) {
            navigate("/");
        }
        state.auth.errorMessage !== "" ? setIsLoginSuccess(false) : setIsLoginSuccess(true);
        return () =>{
            // do componentWillUnmount
        }
    }, [navigate, dispatch, state])

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
