import { Link } from "react-router-dom";

const SecureHeader = () => {
	const content = (
		<header className="secure-header">
			<div className="secure-header__container">
				<Link to="/sec">
					<h1 className="secure-header__title">
						Learning Triangle informační systém
					</h1>
				</Link>
				<nav className="secure-header__nav">
					{/* add nav buttons later TODO */}
				</nav>
			</div>
		</header>
	);

	return content;
};
export default SecureHeader;
