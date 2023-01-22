import { Outlet } from "react-router-dom";
import SecureHeader from "./SecureHeader";
import SecureFooter from "./SecureFooter";
/*import {
	readFromLocalStorage,
	saveToLocalStorage,
} from "../hooks/useLocalStorage";*/

const SecureLayout = () => {
	/*let darkMode = readFromLocalStorage("darkMode");

	if (darkMode === "Not found") {
		saveToLocalStorage("darkMode", false);
		darkMode = false;
	}
	const colorSchema = darkMode ? "dark_mode" : "light_mode";
	console.log(colorSchema);*/

	return (
		<div>
			<SecureHeader />
			<hr className="secure_header--hr" />
			{/*<div className={`secure-container ${colorSchema}`}>*/}
			<div className="secure-container">
				<Outlet />
			</div>
			<hr className="secure_footer--hr" />
			<SecureFooter />
		</div>
	);
};
export default SecureLayout;
