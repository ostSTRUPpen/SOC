import { useSelector } from "react-redux";
import NewLektorForm from "./NewLektorForm";
import { selectAllMentors } from "../Mentors/mentorsApiSlice";
const NewLektor = () => {
	const mentors = useSelector(selectAllMentors);

	const content: JSX.Element = mentors ? (
		<NewLektorForm mentors={mentors} />
	) : (
		<div className="loading"></div>
	);
	return content;
};

export default NewLektor;
