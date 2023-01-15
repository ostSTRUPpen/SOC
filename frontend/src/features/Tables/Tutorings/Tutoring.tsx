import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectTutoringById } from "./tutoringsApiSlice";
import { selectLektorById } from "../Lektors/lektorsApiSlice";
import { selectClientById } from "../Klients/clientsApiSlice";

const Tutoring: any = ({ tutoringId }: any) => {
	const tutoring = useSelector((state) =>
		selectTutoringById(state, tutoringId)
	);
	const lektor = useSelector((state) =>
		selectLektorById(state, tutoring.lektor)
	);
	const client = useSelector((state) =>
		selectClientById(state, tutoring.client)
	);

	const navigate = useNavigate();

	if (tutoring) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const displayLessons = () => navigate(`/sec/tutorings/${tutoringId}`);
		const handleEdit = () => navigate(`/sec/tutorings/edit/${tutoringId}`);
		const isActive = tutoring.active ? "" : "table__cell--inactive";

		const canEdit: boolean = true;

		let editing: JSX.Element;

		if (canEdit) {
			editing = (
				<button
					title="edit tutorings"
					className="icon-button table__button--edi"
					onClick={handleEdit}
				>
					<FontAwesomeIcon icon={faPenToSquare} />
				</button>
			);
		} else {
			editing = <></>;
		}

		return (
			<tr className="table__row tutoring">
				<td
					className={`table__cell ${isActive}`}
				>{`${lektor.name} ${lektor.surname}`}</td>
				<td className={`table__cell ${isActive}`}>
					{`${client.name_child} ${client.surname_child}`}
				</td>
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
					{editing}
				</td>
			</tr>
		);
	} else return null;
};

export default Tutoring;
