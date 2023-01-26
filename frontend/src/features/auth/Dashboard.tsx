import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
	useTitle("LT IS: Domovská stránka");
	const { id, isLektor, isClient, isMentor, isAdmin } = useAuth();

	const navigate = useNavigate();
	const navToTutorings = () => navigate("/sec/tutorings");
	const navToLektors = () => navigate("/sec/lektors");
	const navToClients = () => navigate("/sec/clients");
	const navToInvoices = () => navigate("/sec/invoices");
	const navToSalaries = () => navigate("/sec/salaries");
	const navToMentors = () => navigate("/sec/mentors");
	const navToSettings = () => navigate(`/sec/mentors/${id}`);

	const navMentorToTutorings = () => navigate(`/sec/tutorings/show3/${id}`);
	const navMentorToLektors = () => navigate(`/sec/lektors/show/${id}`);
	const navMentorToClients = () => navigate(`/sec/clients/show/${id}`);
	const navMentorToInvoices = () => navigate(`/sec/invoices/show1/${id}`);
	const navMentorToSalaries = () => navigate(`/sec/salaries/show1/${id}`);
	const navMentorToSettings = () => navigate(`/sec/mentors/${id}`);

	const navClientToTutorings = () => navigate(`/sec/tutorings/show2/${id}`);
	const navClientToInvoices = () => navigate(`/sec/invoices/show2/${id}`);
	const navClientToSettings = () => navigate(`/sec/clients/${id}`);

	const navLektorToTutorings = () => navigate(`/sec/tutorings/show1/${id}`);
	const navLektorToSalaries = () => navigate(`/sec/salaries/show2/${id}`);
	const navLektorToSettings = () => navigate(`/sec/lektors/${id}`);

	const content = (
		<section className="dashboard">
			<h5>Dobrý den</h5>
			{isAdmin && (
				<div>
					<button className="middle__button" onClick={navToMentors}>
						Mentoři
					</button>
					<br />

					<button className="middle__button" onClick={navToLektors}>
						Lektoři
					</button>

					<br />

					<button className="middle__button" onClick={navToClients}>
						Klienti
					</button>
					<br />
					<button className="middle__button" onClick={navToTutorings}>
						Finance
					</button>
					<br />

					<button className="middle__button" onClick={navToTutorings}>
						Doučování
					</button>
					<br />

					<button className="middle__button" onClick={navToInvoices}>
						Faktury
					</button>
					<br />

					<button className="middle__button" onClick={navToSalaries}>
						Výplaty
					</button>
					<br />
					<button className="middle__button" onClick={navToSettings}>
						Uživatelská nastavení
					</button>
				</div>
			)}
			{isMentor && (
				<div>
					<button
						className="middle__button"
						onClick={navMentorToLektors}>
						Lektoři
					</button>

					<br />

					<button
						className="middle__button"
						onClick={navMentorToClients}>
						Klienti
					</button>
					<br />

					<button
						className="middle__button"
						onClick={navMentorToTutorings}>
						Doučování
					</button>
					<br />

					<button
						className="middle__button"
						onClick={navMentorToTutorings}>
						Finance
					</button>
					<br />

					<button
						className="middle__button"
						onClick={navMentorToInvoices}>
						Faktury
					</button>
					<br />

					<button
						className="middle__button"
						onClick={navMentorToSalaries}>
						Výplaty
					</button>
					<br />
					<button
						className="middle__button"
						onClick={navMentorToSettings}>
						Uživatelská nastavení
					</button>
				</div>
			)}
			{isLektor && (
				<div>
					<button
						className="middle__button"
						onClick={navLektorToTutorings}>
						Doučování
					</button>
					<br />

					<button
						className="middle__button"
						onClick={navLektorToTutorings}>
						Finance
					</button>
					<br />

					<button
						className="middle__button"
						onClick={navLektorToSalaries}>
						Výplaty
					</button>
					<br />
					<button
						className="middle__button"
						onClick={navLektorToSettings}>
						Uživatelská nastavení
					</button>
				</div>
			)}
			{isClient && (
				<div>
					<button
						className="middle__button"
						onClick={navClientToTutorings}>
						Doučování
					</button>
					<br />
					<button
						className="middle__button"
						onClick={navClientToTutorings}>
						Finance
					</button>
					<br />
					<button
						className="middle__button"
						onClick={navClientToInvoices}>
						Faktury
					</button>
					<br />
					<button
						className="middle__button"
						onClick={navClientToSettings}>
						Uživatelská nastavení
					</button>
				</div>
			)}
		</section>
	);

	return content;
};
export default Welcome;
