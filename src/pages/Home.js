import { Link } from 'react-router-dom';
import { Button } from "@elevenia/master-ui/components/Atom";
import { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
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
        <div className="App">
            <header className="App-header">
                <h1 className="w-full mb-5">HOME</h1>
                <div className="w-full -mx-3 mb-6 text-center space-x-5">
                    {!isLogin && <Button variant="secondary"><Link to="/login">Login</Link></Button>}
                    {!isLogin && <Button variant="secondary"><Link to="/register">Register</Link></Button>}
                </div>
                {isLogin && <Button variant="secondary" onClick={logout}>Logout</Button>}
            </header>
        </div>
    )
}

export default Home;
