import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLektorById } from "./lektorsApiSlice";
import EditLektorForm from "./EditLektorForm";
import { selectAllMentors } from "../Mentors/mentorsApiSlice";

const EditLesson = () => {
	const { id }: any = useParams();

	const lektor = useSelector((state) => selectLektorById(state, id));

	const mentors = useSelector(selectAllMentors);

	const content: JSX.Element =
		lektor && mentors ? (
			<EditLektorForm lektor={lektor} mentors={mentors} />
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default EditLesson;
