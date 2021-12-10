import React from "react";

const Home = React.lazy(() => import('../pages/Home'));
const Register = React.lazy(() => import('../pages/Register'));
const Login = React.lazy(() => import('../pages/Login'));
const Gallery = React.lazy(() => import('../pages/Gallery'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

const publicRoute = [
    { path: '/login', name: 'Login', element: Login },
    { path: '/register', name: 'Register', element: Register },
    { path: '*', name: 'NotFound', element: NotFound },
]

const privateRoute = [
    { path: '/', name: 'Home', element: Home, access: 'Home' },
    { path: '/gallery', name: 'Gallery', element: Gallery, access: 'User' },
]

const RouteConfig = { 
    'public': publicRoute, 
    'private': privateRoute
};
export default RouteConfig;
