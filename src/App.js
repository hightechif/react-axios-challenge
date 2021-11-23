import React, {Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import RouteConfig from './config/RouteConfig';

function App() {
	const loading = () => (<></>)
	
	return (
		<BrowserRouter>
			<Navbar />
			<Suspense fallback={loading()}>
				<Routes>
					{RouteConfig.public.map((route, idx) => {
						return route.element ? (
							<Route
							key={idx}
							path={route.path}
							name={route.name}
							element={route.element}
							/>
							) : null
						})}
					<Route path="/" element={<Home/>} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default App;
