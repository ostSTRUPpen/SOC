import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faRightFromBracket,
	faUserGear,
	faCreditCard,
	faUsers,
	faWallet,
	faFileInvoice,
	faChalkboardTeacher,
	faHouseUser,
	faPeopleRoof,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const MENTORS_ROUTE_REGEX = /^\/sec\/mentors(\/.{1,100})?$/;
const LEKTORS_ROUTE_REGEX = /^\/sec\/lektors(\/.{1,100})?$/;
const CLIENTS_ROUTE_REGEX = /^\/sec\/clients(\/.{1,100})?$/;
const TUTORINGS_ROUTE_REGEX = /^\/sec\/tutorings(\/.{1,100})?$/;
const FINANCES_ROUTE_REGEX = /^\/sec\/finances(\/.{1,100})?$/;
const INVOICES_ROUTE_REGEX = /^\/sec\/invoices(\/.{1,100})?$/;
const SALARIES_ROUTE_REGEX = /^\/sec\/salaries(\/.{1,100})?$/;
const SETTINGS_ROUTE_REGEX =
	/^\/sec\/((mentors)|(clients)|(lektors))\/[0-pA-z]{24}$/;

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
			const errMsg =
				"error" in error ? error.error : JSON.stringify(error.data);

			return (
				<div>
					<div>Došlo k chybě:</div>
					<div>{errMsg}</div>
				</div>
			);
		} else {
			return <div>{error.message}</div>;
		}
	}

	const onHomeClicked = () => navigate("/sec");
	const onLogOutClicked = () => {
		sendLogout("");
		navigate("/");
	};

	const onAdminNavToMentorsClicked = () => navigate("/sec/mentors");
	const onAdminNavToLektorsClicked = () => navigate("/sec/lektors");
	const onAdminNavToClientsClicked = () => navigate("/sec/clients");
	const onAdminNavToTutoringsClicked = () => navigate("/sec/tutorings");
	const onAdminNavToInvoicesClicked = () => navigate(`/sec/invoices`);
	const onAdminNavToSalariesClicked = () => navigate(`/sec/salaries`);
	const onAdminNavToSettingsClicked = () => navigate(`/sec/mentors/${id}`);

	const onMentorNavToLektorsClicked = () =>
		navigate(`/sec/lektors/show/${id}`);
	const onMentorNavToClientsClicked = () =>
		navigate(`/sec/clients/show/${id}`);
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

	const isSelectedMentors = MENTORS_ROUTE_REGEX.test(pathname)
		? "nav__helper--selected"
		: "";
	const isSelectedLektors = LEKTORS_ROUTE_REGEX.test(pathname)
		? "nav__helper--selected"
		: "";
	const isSelectedClients = CLIENTS_ROUTE_REGEX.test(pathname)
		? "nav__helper--selected"
		: "";
	const isSelectedTutorings = TUTORINGS_ROUTE_REGEX.test(pathname)
		? "nav__helper--selected"
		: "";
	const isSelectedFinances = FINANCES_ROUTE_REGEX.test(pathname)
		? "nav__helper--selected"
		: "";
	const isSelectedInvoices = INVOICES_ROUTE_REGEX.test(pathname)
		? "nav__helper--selected"
		: "";
	const isSelectedSalaries = SALARIES_ROUTE_REGEX.test(pathname)
		? "nav__helper--selected"
		: "";
	const isSelectedSettings = SETTINGS_ROUTE_REGEX.test(pathname)
		? "nav__helper--selected"
		: "";

	const logoutButton: JSX.Element = (
		<button
			className="secure__header--logout header_icon_button"
			title="Odhlásit se"
			onClick={onLogOutClicked}>
			<FontAwesomeIcon icon={faRightFromBracket} /> Odhlásit se
		</button>
	);

	let homeButton: JSX.Element = <div></div>;
	if (pathname !== "/sec") {
		homeButton = (
			<button
				className="secure-header__button header_icon_button"
				title="Domů"
				onClick={onHomeClicked}>
				<FontAwesomeIcon icon={faHouse} /> Domů
			</button>
		);
	}

	let navButtons: JSX.Element = <div></div>;
	if (isAdmin) {
		navButtons = (
			<>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedMentors}`}
					title="Mentoři"
					onClick={onAdminNavToMentorsClicked}>
					<FontAwesomeIcon icon={faPeopleRoof} /> Mentoři
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedLektors}`}
					title="Lektoři"
					onClick={onAdminNavToLektorsClicked}>
					<FontAwesomeIcon icon={faChalkboardTeacher} /> Lektoři
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedClients}`}
					title="Klienti"
					onClick={onAdminNavToClientsClicked}>
					<FontAwesomeIcon icon={faHouseUser} /> Klienti
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedTutorings}`}
					title="Doučování"
					onClick={onAdminNavToTutoringsClicked}>
					<FontAwesomeIcon icon={faUsers} /> Doučování
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedFinances}`}
					title="Finance"
					onClick={onAdminNavToTutoringsClicked}>
					<FontAwesomeIcon icon={faWallet} /> Finance
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedInvoices}`}
					title="Faktury"
					onClick={onAdminNavToInvoicesClicked}>
					<FontAwesomeIcon icon={faFileInvoice} /> Faktury
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedSalaries}`}
					title="Výplaty"
					onClick={onAdminNavToSalariesClicked}>
					<FontAwesomeIcon icon={faCreditCard} /> Výplaty
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedSettings}`}
					title="Nastavení"
					onClick={onAdminNavToSettingsClicked}>
					<FontAwesomeIcon icon={faUserGear} /> Nastavení
				</button>
			</>
		);
	} else if (isMentor) {
		navButtons = (
			<>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedLektors}`}
					title="Lektoři"
					onClick={onMentorNavToLektorsClicked}>
					<FontAwesomeIcon icon={faChalkboardTeacher} /> Lektoři
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedClients}`}
					title="Klienti"
					onClick={onMentorNavToClientsClicked}>
					<FontAwesomeIcon icon={faHouseUser} /> Klienti
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedTutorings}`}
					title="Doučování"
					onClick={onMentorNavToTutoringsClicked}>
					<FontAwesomeIcon icon={faUsers} /> Doučování
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedFinances}`}
					title="Finance"
					onClick={onMentorNavToTutoringsClicked}>
					<FontAwesomeIcon icon={faWallet} /> Finance
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedInvoices}`}
					title="Faktury"
					onClick={onMentorNavToInvoicesClicked}>
					<FontAwesomeIcon icon={faFileInvoice} /> Faktury
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedSalaries}`}
					title="Výplaty"
					onClick={onMentorNavToSalariesClicked}>
					<FontAwesomeIcon icon={faCreditCard} /> Výplaty
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedSettings}`}
					title="Nastavení"
					onClick={onMentorNavToSettingsClicked}>
					<FontAwesomeIcon icon={faUserGear} /> Nastavení
				</button>
			</>
		);
	} else if (isLektor) {
		navButtons = (
			<>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedTutorings}`}
					title="Doučování"
					onClick={onLektorNavToTutoringsClicked}>
					<FontAwesomeIcon icon={faUsers} /> Doučování
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedFinances}`}
					title="Finance"
					onClick={onLektorNavToTutoringsClicked}>
					<FontAwesomeIcon icon={faWallet} /> Finance
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedSalaries}`}
					title="Výplaty"
					onClick={onLektorNavToSalariesClicked}>
					<FontAwesomeIcon icon={faCreditCard} /> Výplaty
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedSettings}`}
					title="Nastavení"
					onClick={onLektorNavToSettingsClicked}>
					<FontAwesomeIcon icon={faUserGear} /> Nastavení
				</button>
			</>
		);
	} else if (isClient) {
		navButtons = (
			<>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedTutorings}`}
					title="Doučování"
					onClick={onClientNavToTutoringsClicked}>
					<FontAwesomeIcon icon={faUsers} /> Doučování
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedFinances}`}
					title="Finance"
					onClick={onClientNavToTutoringsClicked}>
					<FontAwesomeIcon icon={faWallet} /> Finance
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedInvoices}`}
					title="Faktury"
					onClick={onClientNavToInvoicesClicked}>
					<FontAwesomeIcon icon={faFileInvoice} /> Faktury
				</button>
				<button
					className={`secure-header__navbutton header_icon_button ${isSelectedSettings}`}
					title="Nastavení"
					onClick={onClientNavToSettingsClicked}>
					<FontAwesomeIcon icon={faUserGear} /> Nastavení
				</button>
			</>
		);
	}

	const errClass = isError ? "errmsg" : "offscreen";

	const content = (
		<>
			<p className={errClass}>{error?.data?.message}</p>
			<header className="secure-header">
				<div className="secure-header__container">
					<img
						className="secure-header__title"
						src={process.env.PUBLIC_URL + "lt_logo.png"}
						alt="Learning Triangle logo"
						height="1%"
						width="100%"
					/>
					<nav className="secure-header__nav">
						{homeButton}
						{navButtons}
						{logoutButton}
					</nav>
					<h4>
						{name} {surname}, {status}
					</h4>
				</div>
			</header>
			<hr className="secure_header--hr" />
		</>
	);

	return content;
};
export default SecureHeader;
