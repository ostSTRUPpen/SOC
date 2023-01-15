//import { Link } from "react-router-dom";
//import LessonsList from "../Tables/Lessons/LessonsList";
//import TutoringsList from "../Tables/Tutorings/TutoringsList";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
	// Ruším Adamův plán dashboardu plného inforamcí
	const navigate = useNavigate();
	const navToTutorings = () => navigate("/sec/tutorings");
	const navToLektors = () => navigate("/sec/lektors");
	const navToClients = () => navigate("/sec/clients");
	const content = (
		<section className="Dashboard">
			<button className="middle__button" onClick={navToTutorings}>
				Doučování
			</button>{" "}
			<br />
			<button className="middle__button" onClick={navToLektors}>
				Lektoři
			</button>{" "}
			<br />
			<button className="middle__button" onClick={navToClients}>
				Klienti
			</button>{" "}
			<br />
		</section>
	);

	return content;
};
export default Welcome;
