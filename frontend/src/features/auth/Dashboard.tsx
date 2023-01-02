//import { Link } from "react-router-dom";
//import LessonsList from "../Tables/Lessons/LessonsList";
//import TutoringsList from "../Tables/Tutorings/TutoringsList";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
	// Ruším Adamův plán dashboardu plného inforamcí
	const navigate = useNavigate();
	const navToTutorings = () => navigate("/sec/tutorings");
	const content = (
		<section className="Dashboard">
			<button className="middle__button" onClick={navToTutorings}>
				Doučování
			</button>
		</section>
	);

	return content;
};
export default Welcome;
