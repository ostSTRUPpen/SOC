import { useParams } from "react-router-dom";
import NewLessonForm from "./NewLessonForm";

const NewLesson = () => {
	const { tutoringId } = useParams();

	const content: JSX.Element = tutoringId ? (
		<NewLessonForm tutoring={tutoringId} />
	) : (
		<div className="loading"></div>
	);
	return content;
};

export default NewLesson;
