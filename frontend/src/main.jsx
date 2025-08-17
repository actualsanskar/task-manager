import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import "./index.css";
import App from "./App.jsx";
import store from "./store/store.js";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import {Home, Dashboard} from "./pages/pagesIndex.js";
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx";
import {SignUp, Login} from "./pages/pagesIndex.js";



const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="" element={<Home />} />
			<Route path="signup" element={<SignUp />} />
			<Route path="login" element={<Login />} />
			<Route
				path="tasks"
				element={
					<ProtectedRoutes>
						<Dashboard />
					</ProtectedRoutes>
				}
			/>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
