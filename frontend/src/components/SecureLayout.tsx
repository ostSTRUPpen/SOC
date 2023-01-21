import { Outlet } from "react-router-dom";
import SecureHeader from "./SecureHeader";
import SecureFooter from "./SecureFooter";

const SecureLayout = () => {
	return (
		<div>
			<SecureHeader />
			<div className="secure-container">
				<Outlet />
			</div>
			<SecureFooter />
		</div>
	);
};
export default SecureLayout;
