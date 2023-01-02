/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom"; */

const SecureFooter = () => {
	/*const navigate = useNavigate();
	const { pathname } = useLocation();

	const onGoHomeClicked = () => navigate("/secure");

	let goHomeButton = null;
	if (pathname !== "/secure") {
		goHomeButton = (
			<button
				className="secure-footer__button icon-button"
				title="Home"
				onClick={onGoHomeClicked}
			>
				<FontAwesomeIcon icon={faHouse} />
			</button>
		);
	}
	*/
	const content = (
		<footer className="secure-footer">
			{/*{goHomeButton}*/}
			<p>Current User:</p>
			<p>Status:</p>
		</footer>
	);
	return content;
};
export default SecureFooter;
