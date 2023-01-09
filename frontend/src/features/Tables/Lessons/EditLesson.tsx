import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLessonById } from "./lessonsApiSlice";
import EditLessonForm from "./EditLessonForm";

const EditLesson = () => {
	const { id }: any = useParams();
	// console.log("a");
	const lesson = useSelector((state) => selectLessonById(state, id));

	const content: JSX.Element = lesson ? (
		<EditLessonForm lesson={lesson} />
	) : (
		<div className="loading"></div>
	);
	return content;
};

export default EditLesson;
