import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: any) => {
	const location = useLocation();
	const { role } = useAuth();

	const content = allowedRoles.includes(role) ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);

	return content;
};
export default RequireAuth;
