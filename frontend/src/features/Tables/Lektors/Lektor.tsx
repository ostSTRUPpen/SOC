import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectLektorById } from "./lektorsApiSlice";
import { selectMentorById } from "../Mentors/mentorsApiSlice";

const Lektor: any = ({ lektorId }: any) => {
	const lektor = useSelector((state) => selectLektorById(state, lektorId));
	const mentor = useSelector((state) =>
		selectMentorById(state, lektor.mentor)
	);

	const navigate = useNavigate();

	if (lektor && mentor) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const handleViewTutorings = () =>
			navigate(`/sec/tutorings/show1/${lektorId}`);
		const handleEdit = () => navigate(`/sec/lektors/${lektorId}`);
		const canViewTutorings: boolean = true;
		const canEdit: boolean = true;

		let viewTutorings;
		if (canViewTutorings) {
			viewTutorings = (
				<td className="table__cell">
					<button
						title="view button"
						className="icon-button table__button--view"
						onClick={handleViewTutorings}
					>
						<FontAwesomeIcon icon={faEye} />
					</button>
				</td>
			);
		} else {
			viewTutorings = <td className="table__cell" hidden></td>;
		}
		let editing;
		if (canEdit) {
			editing = (
				<td className="table__cell">
					<button
						title="edit button"
						className="icon-button table__button--edit"
						onClick={handleEdit}
					>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			);
		} else {
			editing = <td className="table__cell" hidden></td>;
		}

		return (
			<tr className="table__row lektor">
				<td className="table__cell">{`${mentor.name} ${mentor.surname}`}</td>
				<td className="table__cell">{lektor.username}</td>
				<td className="table__cell">{lektor.name}</td>
				<td className="table__cell">{lektor.surname}</td>
				<td className="table__cell">{lektor.date_of_birth}</td>
				<td className="table__cell">{lektor.gmail}</td>
				<td className="table__cell">{lektor.email}</td>
				<td className="table__cell">{lektor.phone_num}</td>
				<td className="table__cell">{lektor.bank_account}</td>
				{viewTutorings}
				{editing}
			</tr>
		);
	} else return null;
};

export default Lektor;
