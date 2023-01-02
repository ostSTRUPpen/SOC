import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectTutoringById } from "./tutoringsApiSlice";

const Tutoring: any = ({ tutoringId }: any) => {
	const tutoring = useSelector((state) =>
		selectTutoringById(state, tutoringId)
	);

	const navigate = useNavigate();

	if (tutoring) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const displayLessons = () => navigate(`/sec/tutorings/${tutoringId}`);
		const isActive = tutoring.active ? "" : "table__cell--inactive";

		return (
			<tr className="table__row tutoring">
				<td className={`table__cell ${isActive}`}>{tutoring.lektor}</td>
				<td className={`table__cell ${isActive}`}>{tutoring.client}</td>
				<td className={`table__cell ${isActive}`}>
					{tutoring.subject}
				</td>
				<td className="table__cell">
					<button
						title="view lessons"
						className="icon-button table__button--view"
						onClick={displayLessons}
					>
						<FontAwesomeIcon icon={faEye} />
					</button>
				</td>
			</tr>
		);
	} else return null;
};

export default Tutoring;
