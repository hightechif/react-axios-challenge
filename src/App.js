import React, {Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./pages/Home";
import RouteConfig from './config/RouteConfig';

function App() {
	const loading = () => <span>Loading...</span>
	return (
		<BrowserRouter>
			<Navbar />
				<Routes>
					{RouteConfig.public.map((route, idx) => {
						return route.element ? (
							<Route
							key={idx}
							path={route.path}
							name={route.name}
							element={
								<Suspense fallback={loading()}>
									<route.element />
								</Suspense>
							}
							/>
							) : null
						})}
					<Route path="/" element={<Home/>} />
				</Routes>
		</BrowserRouter>
	)
}

export default App;
