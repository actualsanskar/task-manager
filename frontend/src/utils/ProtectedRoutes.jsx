import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";

function ProtectedRoutes({children}) {
	const isAuth = useSelector((store) => store.auth.authStatus);

	return <div>{isAuth ? children : <Navigate to="/login" />}</div>;
}

export default ProtectedRoutes;
