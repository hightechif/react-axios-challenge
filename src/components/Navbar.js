import { Link } from 'react-router-dom';
import { Button } from "@elevenia/master-ui/components/Atom";
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
    .button_wrapper {
        margin: 7px 5px;
        display: flex;
        gap: 10px;
        position: absolute;
        right: 5px;
        .button {
            background: #FFFFFF;
            color: #334756;
        }
    }
`

const Navbar = () => {
    const isLogin = !!window.localStorage.getItem("ACCESS_TOKEN");

    const logout = () => {
        window.localStorage.removeItem("ACCESS_TOKEN");
        window.location.reload();
    }

    return (
        <StyledNavbar>
            <Link to="/"><h1>FMovie</h1></Link>
            <div className="button_wrapper">
                {!isLogin && <Button className="button"><Link to="/login">Login</Link></Button>}
                {!isLogin && <Button className="button"><Link to="/register">Register</Link></Button>}
                {isLogin && <Button className="button" onClick={logout}>Logout</Button>}
            </div>
        </StyledNavbar>
    )
}

export default Navbar
