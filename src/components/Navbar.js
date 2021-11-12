import { Link } from 'react-router-dom';
import { Button } from "@elevenia/master-ui/components/Atom";
import { useEffect } from 'react';
import axios from 'axios';
import styled from "styled-components";

const StyledNavbar = styled.header`
    background: #334756;
    color: #FFFFFF;
    text-align: left;
    padding: 2px;
    display: flex;
    h1 {
        padding: 15px 30px;
    }
    .button {
        margin: 7px 5px 5px 75%;
        display: flex;
        gap: 10px;
        justify-content: right;
    }
`

const Navbar = () => {
    const isLogin = !!window.localStorage.getItem("ACCESS_TOKEN");

    const logout = () => {
        window.localStorage.removeItem("ACCESS_TOKEN");
        window.location.reload();
    }

    useEffect(() => {
        const service = async () => await axios({
            method: 'get',
            baseURL: 'https://fadhil-auth.herokuapp.com',
            url: '/api/v1',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        service(); // API activation
    })

    return (
        <StyledNavbar>
            <Link to="/"><h1>FMovie</h1></Link>
            <div className="button">
                {!isLogin && <Button variant="secondary"><Link to="/login">Login</Link></Button>}
                {!isLogin && <Button variant="secondary"><Link to="/register">Register</Link></Button>}
                {isLogin && <Button variant="secondary" onClick={logout}>Logout</Button>}
            </div>
        </StyledNavbar>
    )
}

export default Navbar
