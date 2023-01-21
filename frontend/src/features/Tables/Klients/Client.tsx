import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetClientsQuery } from "./clientsApiSlice";
import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";

const Client: any = ({ clientId }: any) => {
	const { client } = useGetClientsQuery("clientsList", {
		selectFromResult: ({ data }: any) => ({
			client: data?.entities[clientId],
		}),
	});
	const { mentor } = useGetMentorsQuery("mentorsList", {
		selectFromResult: ({ data }: any) => ({
			mentor: data?.entities[client.mentor],
		}),
	});

	const navigate = useNavigate();
	if (client && mentor) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const handleViewTutorings = () =>
			navigate(`/sec/tutorings/show2/${clientId}`);
		const handleEdit = () => navigate(`/sec/clients/${clientId}`);
		const canViewTutorings: boolean = true;
		const canEdit: boolean = true;

		let viewTutorings;
		if (canViewTutorings) {
			viewTutorings = (
				<td className="table__cell">
					<button
						title="view button"
						className="icon-button table__button--view"
						onClick={handleViewTutorings}>
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
						onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			);
		} else {
			editing = <td className="table__cell" hidden></td>;
		}
		return (
			<tr className="table__row client">
				<td className="table__cell">{`${mentor.name} ${mentor.surname}`}</td>
				<td className="table__cell">{client.username}</td>
				<td className="table__cell">{client.name_parent}</td>
				<td className="table__cell">{client.surname_parent}</td>
				<td className="table__cell">{client.gmail_parent}</td>
				<td className="table__cell">{client.email_parent}</td>
				<td className="table__cell">{client.phone_num_parent}</td>
				<td className="table__cell">{client.bank_account}</td>
				<td className="table__cell">{client.name_child}</td>
				<td className="table__cell">{client.surname_child}</td>
				<td className="table__cell">{client.gmail_child}</td>
				<td className="table__cell">{client.email_child}</td>
				<td className="table__cell">{client.phone_num_child}</td>
				<td className="table__cell">{client.date_of_birth_child}</td>
				{viewTutorings}
				{editing}
			</tr>
		);
	} else return null;
};

export default Client;
