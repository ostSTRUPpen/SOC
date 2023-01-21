import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faRightFromBracket,
	faUserGear,
	// faUserPlus,
	faCreditCard,
	faUsers,
	faCreditCardAlt,
	faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

//const TUTORINGS_ROUTE_REGEX = /^\/sec\/tutorings(\/?).*/;

const SecureHeader = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const { id, name, surname, status, isAdmin, isMentor, isClient, isLektor } =
		useAuth();

	const [sendLogout, { isLoading, isSuccess, isError, error }] =
		useSendLogoutMutation();

	useEffect(() => {
		if (isSuccess) navigate("/");
	}, [isSuccess, navigate]);

	if (isLoading) return <div className="loading"></div>;

	if (error) {
		if ("status" in error) {
			// you can access all properties of `FetchBaseQueryError` here
			const errMsg =
				"error" in error ? error.error : JSON.stringify(error.data);

			return (
				<div>
					<div>Došlo k chybě:</div>
					<div>{errMsg}</div>
				</div>
			);
		} else {
			// you can access all properties of `SerializedError` here
			return <div>{error.message}</div>;
		}
	}

	const onHomeClicked = () => navigate("/sec");
	const onLogOutClicked = () => {
		sendLogout("");
		navigate("/");
	};

	const onAdminNavToTutoringsClicked = () => navigate("/sec/tutorings");
	const onAdminNavToInvoicesClicked = () => navigate(`/sec/invoices/`);
	const onAdminNavToSalariesClicked = () => navigate(`/sec/salaries/`);
	const onAdminNavToSettingsClicked = () => navigate(`/sec/mentors/${id}`);

	const onMentorNavToTutoringsClicked = () =>
		navigate(`/sec/tutorings/show3/${id}`);
	const onMentorNavToInvoicesClicked = () =>
		navigate(`/sec/invoices/show1/${id}`);
	const onMentorNavToSalariesClicked = () =>
		navigate(`/sec/salaries/show1/${id}`);
	const onMentorNavToSettingsClicked = () => navigate(`/sec/mentors/${id}`);

	const onClientNavToTutoringsClicked = () =>
		navigate(`/sec/tutorings/show2/${id}`);
	const onClientNavToInvoicesClicked = () =>
		navigate(`/sec/invoices/show2/${id}`);
	const onClientNavToSettingsClicked = () => navigate(`/sec/clients/${id}`);

	const onLektorNavToTutoringsClicked = () =>
		navigate(`/sec/tutorings/show1/${id}`);
	const onLektorNavToSalariesClicked = () =>
		navigate(`/sec/salaries/show2/${id}`);
	const onLektorNavToSettingsClicked = () => navigate(`/sec/lektors/${id}`);

	const logoutButton: JSX.Element = (
		<button
			className="secure__header--logout header_icon_button"
			title="Logout"
			onClick={onLogOutClicked}>
			<FontAwesomeIcon icon={faRightFromBracket} />
		</button>
	);

	let homeButton: JSX.Element = <div></div>;
	if (pathname !== "/sec") {
		homeButton = (
			<button
				className="secure-header__button header_icon_button"
				title="Home"
				onClick={onHomeClicked}>
				<FontAwesomeIcon icon={faHouse} />
			</button>
		);
	}

	let navButtons: JSX.Element = <div></div>;
	if (pathname === "/sec" || true) {
		navButtons = (
			<>
				{isAdmin && (
					<>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Doučování"
							onClick={onAdminNavToTutoringsClicked}>
							<FontAwesomeIcon icon={faUsers} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Faktury"
							onClick={onAdminNavToTutoringsClicked}>
							<FontAwesomeIcon icon={faWallet} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Faktury"
							onClick={onAdminNavToInvoicesClicked}>
							<FontAwesomeIcon icon={faCreditCard} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Výplaty"
							onClick={onAdminNavToSalariesClicked}>
							<FontAwesomeIcon icon={faCreditCardAlt} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Nastavení"
							onClick={onAdminNavToSettingsClicked}>
							<FontAwesomeIcon icon={faUserGear} />
						</button>
					</>
				)}
				{isMentor && (
					<>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Doučování"
							onClick={onMentorNavToTutoringsClicked}>
							<FontAwesomeIcon icon={faUsers} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Faktury"
							onClick={onMentorNavToTutoringsClicked}>
							<FontAwesomeIcon icon={faWallet} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Faktury"
							onClick={onMentorNavToInvoicesClicked}>
							<FontAwesomeIcon icon={faCreditCard} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Výplaty"
							onClick={onMentorNavToSalariesClicked}>
							<FontAwesomeIcon icon={faCreditCardAlt} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Nastavení"
							onClick={onMentorNavToSettingsClicked}>
							<FontAwesomeIcon icon={faUserGear} />
						</button>
					</>
				)}
				{isClient && (
					<>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Doučování"
							onClick={onClientNavToTutoringsClicked}>
							<FontAwesomeIcon icon={faUsers} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Faktury"
							onClick={onClientNavToTutoringsClicked}>
							<FontAwesomeIcon icon={faWallet} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Faktury"
							onClick={onClientNavToInvoicesClicked}>
							<FontAwesomeIcon icon={faCreditCard} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Nastavení"
							onClick={onClientNavToSettingsClicked}>
							<FontAwesomeIcon icon={faUserGear} />
						</button>
					</>
				)}
				{isLektor && (
					<>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Doučování"
							onClick={onLektorNavToTutoringsClicked}>
							<FontAwesomeIcon icon={faUsers} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Faktury"
							onClick={onLektorNavToTutoringsClicked}>
							<FontAwesomeIcon icon={faWallet} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Výplaty"
							onClick={onLektorNavToSalariesClicked}>
							<FontAwesomeIcon icon={faCreditCard} />
						</button>
						<button
							className="secure-header__navbutton header_icon_button"
							title="Nastavení"
							onClick={onLektorNavToSettingsClicked}>
							<FontAwesomeIcon icon={faUserGear} />
						</button>
					</>
				)}
			</>
		);
	}

	const errClass = isError ? "errmsg" : "offscreen";

	const content = (
		<>
			<p className={errClass}>{error?.data?.message}</p>
			<header className="secure-header">
				<div className="secure-header__container">
					<h2 className="secure-header__title">
						Learning Triangle informační systém
					</h2>
					<nav className="secure-header__nav">
						{homeButton}
						{navButtons}
						{logoutButton}
						{/* add nav buttons later TODO */}
					</nav>
					<h3>
						{name} {surname}, {status}
					</h3>
				</div>
			</header>
		</>
	);

	return content;
};
export default SecureHeader;
