import { Outlet } from "react-router-dom";
import SecureHeader from "./SecureHeader";
import SecureFooter from "./SecureFooter";

const SecureLayout = () => {
	return (
		<>
			<SecureHeader />
			<div className="secure-container">
				<Outlet />
			</div>
			<SecureFooter />
		</>
	);
};
export default SecureLayout;
