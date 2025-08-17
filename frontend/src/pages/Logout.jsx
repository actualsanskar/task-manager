import React from "react";
import {ButtonBox} from "../components/componentIndex.js";
import {api} from "../utils/axiosApi.js";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../store/authSlice.js";

function Logout() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const handleLogout = () => {
		api
			.post("/logout")
			.then((res) => {
				console.log(res.data.message);
				dispatch(logout());
			})
			.catch((e) => {
				console.log(e);
			});

		navigate("/");
	};

	return (
		<ButtonBox text="Logout" type="button" prop={{onClick: handleLogout}} />
	);
}

export default Logout;
