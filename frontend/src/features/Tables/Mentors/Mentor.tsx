import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useGetMentorsQuery } from "./mentorsApiSlice";

const Mentor: any = ({ mentorId }: any) => {
	const { mentor } = useGetMentorsQuery("mentorsList", {
		selectFromResult: ({ data }: any) => ({
			mentor: data?.entities[mentorId],
		}),
	});

	const navigate = useNavigate();

	if (mentor) {
		const handleEdit = () => navigate(`/sec/mentors/${mentorId}`);
		const canEdit = 1;

		let editing;
		if (canEdit) {
			editing = (
				<td className="table__cell">
					<button
						title="Upravit"
						className="icon-button table__button--edit"
						onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			);
		} else {
			editing = <td className="table__cell" hidden></td>;
		}

		return (
			<tr className="table__row mentor">
				<td className="table__cell">{mentor.username}</td>
				<td className="table__cell">{mentor.name}</td>
				<td className="table__cell">{mentor.surname}</td>
				<td className="table__cell">{mentor.date_of_birth}</td>
				<td className="table__cell">{mentor.gmail}</td>
				<td className="table__cell">{mentor.email}</td>
				<td className="table__cell">{mentor.phone_num}</td>
				<td className="table__cell">{mentor.bank_account}</td>
				{editing}
			</tr>
		);
	} else return null;
};

export default Mentor;
