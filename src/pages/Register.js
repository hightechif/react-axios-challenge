import { useState, useEffect, useRef } from 'react';
import { useNavigate  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authActions from '../store/actions/authActions';
import Form from '../components/Form';
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

const Register = () => {
    // Tambah penjagaan username password tidak boleh kosong
    const [ userDTO, setUserDTO ] = useState({
        "username": "",
        "password": ""
    });
    const [ isRegisterSuccess, setIsRegisterSuccess ] = useState(true);
    const [ isSubmit, setIsSubmit ] = useState(false);
    const [ errorMessage, setErrorMessage ] = useState("");
    const mounted = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const handleChange = (event) => {
        const { value, id } = event.target;
        setUserDTO(prev => ({...prev, [id]:value}));
    }

    const handleSubmit = async (event, error) => {
        setIsSubmit(true);
        event.preventDefault();
        if (userDTO.username === "" || userDTO.password === "") {
            setErrorMessage("Username or password can't be empty");
        } else {
            setErrorMessage("Username already exist");
            dispatch(authActions.register(userDTO.username, userDTO.password))
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
        state.auth.errorMessage !== "" ? setIsRegisterSuccess(false) : setIsRegisterSuccess(true);
        return () =>{
            // do componentWillUnmount
        }
    }, [dispatch, navigate, state])

    return (
        <StyledDiv>
            <div className="form__container">
                <h1 className="uppercase font-bold text-gray-700">Register Page</h1>
                <Form biodata={userDTO} handleChange={handleChange} handleSubmit={handleSubmit} isRegistered={false} isRegisterSuccess={isRegisterSuccess} isSubmit={isSubmit} errorMessage={errorMessage} />
            </div>
        </StyledDiv>
    )
}

export default Register;
