import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectMentorById } from "./mentorsApiSlice";
import EditMentorForm from "./EditMentorForm";

const EditMentor = () => {
	const { id }: any = useParams();

	const mentor = useSelector((state) => selectMentorById(state, id));

	const content: JSX.Element = mentor ? (
		<EditMentorForm mentor={mentor} />
	) : (
		<div className="loading"></div>
	);
	return content;
};

export default EditMentor;
