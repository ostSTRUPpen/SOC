import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
	const token = useSelector(selectCurrentToken);
	let isLektor = false;
	let isClient = false;
	let isMentor = false;
	let isAdmin = false;
	let status = "";

	if (token) {
		const decoded: any = jwtDecode(token);
		const { id, name, surname, role } = decoded.UserInfo;

		if (role === "client") {
			status = "Klient";
			isClient = true;
		} else if (role === "lektor") {
			status = "Lektor";
			isLektor = true;
		} else if (role === "mentor") {
			status = "Mentor";
			isMentor = true;
		} else if (role === "admin") {
			status = "Admin";
			isAdmin = true;
		}

		return {
			id,
			name,
			surname,
			role,
			status,
			isLektor,
			isClient,
			isMentor,
			isAdmin,
		};
	}

	return { id: "", name: "", surname: "", role: "", status: "" };
};
export default useAuth;
