import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectClientById } from "./clientsApiSlice";
import EditClientForm from "./EditClientForm";
import { selectAllMentors } from "../Mentors/mentorsApiSlice";

const EditLesson = () => {
	const { id }: any = useParams();

	const client = useSelector((state) => selectClientById(state, id));

	const mentors = useSelector(selectAllMentors);

	const content: JSX.Element =
		client && mentors ? (
			<EditClientForm client={client} mentors={mentors} />
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default EditLesson;
