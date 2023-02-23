import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
	const token = useSelector(selectCurrentToken);
	let isLektor: boolean = false;
	let isClient: boolean = false;
	let isMentor: boolean = false;
	let isAdmin: boolean = false;
	let isTest: boolean = false;
	let status: string = "";
	let returnRole: string = "";

	if (token) {
		const decoded: any = jwtDecode(token);
		const { id, name, surname, role } = decoded.UserInfo;

		if (role === "client") {
			returnRole = role;
			status = "Klient";
			isClient = true;
		} else if (role === "lektor") {
			returnRole = role;
			status = "Lektor";
			isLektor = true;
		} else if (role === "mentor") {
			returnRole = role;
			status = "Mentor";
			isMentor = true;
		} else if (role === "admin") {
			returnRole = role;
			status = "Admin";
			isAdmin = true;
		} else if (role === "test-m") {
			returnRole = "mentor";
			status = "Mentor";
			isTest = true;
			isMentor = true;
		} else if (role === "test-l") {
			returnRole = "lektor";
			status = "Lektor";
			isTest = true;
			isLektor = true;
		} else if (role === "test-c") {
			returnRole = "client";
			status = "Klient";
			isTest = true;
			isClient = true;
		}

		return {
			id,
			name,
			surname,
			role: returnRole,
			status,
			isLektor,
			isClient,
			isMentor,
			isAdmin,
			isTest,
		};
	}

	return { id: "", name: "", surname: "", role: "", status: "" };
};
export default useAuth;
