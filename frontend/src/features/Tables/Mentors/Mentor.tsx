import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectMentorById } from "./mentorsApiSlice";

const Mentor: any = ({ mentorId, tutoringId }: any) => {
	const mentor = useSelector((state) => selectMentorById(state, mentorId));

	const navigate = useNavigate();
	//console.log(tutoringId);
	if (mentor) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const handleEdit = () => navigate(`/sec/mentors/${mentorId}`);
		const canEdit = 1;

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
			<tr className="table__row mentor">
				<td className="table__cell">{mentor.mentor_number}</td>
				<td className="table__cell">{mentor.date}</td>
				<td className="table__cell">{mentor.theme}</td>
				<td className="table__cell">{mentor.length}</td>
				<td className="table__cell">{mentor.info}</td>
				{editing}
			</tr>
		);
	} else return null;
};

export default Mentor;
