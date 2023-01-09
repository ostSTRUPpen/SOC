import { useParams } from "react-router-dom";
import NewLessonForm from "./NewLessonForm";

const NewLesson = () => {
	const { tutId } = useParams();
	// console.log(tutId);
	const content: JSX.Element = tutId ? (
		<NewLessonForm tutoring={tutId} />
	) : (
		<div className="loading"></div>
	);
	return content;
};

export default NewLesson;
