import { useParams } from "react-router-dom";
import LessonsList from "../Lessons/LessonsList";

const DisplayLessons = (): JSX.Element => {
	const { id } = useParams();

	const content = id ? (
		<LessonsList tutoringId={id} amount={-1} />
	) : (
		<div className="loading"></div>
	);

	return content;
};

export default DisplayLessons;
