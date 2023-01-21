import { useParams } from "react-router-dom";
import EditLessonForm from "./EditLessonForm";
import { useGetLessonsQuery } from "./lessonsApiSlice";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const EditLesson = () => {
	useTitle("LT IS: Úprava lekce");
	const { id }: any = useParams();
	const { lesson } = useGetLessonsQuery("lessonsList", {
		selectFromResult: ({ data }: any) => ({
			lesson: data?.entities[id],
		}),
	});

	const { isAdmin, isMentor, isLektor } = useAuth();

	if (!isAdmin && !isMentor && !isLektor) {
		return <div className="no_access">Access denied</div>;
	}

	const content: JSX.Element = lesson ? (
		<EditLessonForm lesson={lesson} />
	) : (
		<div className="loading"></div>
	);
	return content;
};

export default EditLesson;
