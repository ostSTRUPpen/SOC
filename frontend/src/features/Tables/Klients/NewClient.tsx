import { useSelector } from "react-redux";
import NewClientForm from "./NewClientForm";
import { selectAllMentors } from "../Mentors/mentorsApiSlice";
const NewClient = () => {
	const mentors = useSelector(selectAllMentors);

	const content: JSX.Element = mentors ? (
		<NewClientForm mentors={mentors} />
	) : (
		<div className="loading"></div>
	);
	return content;
};

export default NewClient;
