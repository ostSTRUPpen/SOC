import { useParams } from "react-router-dom";
import NewLessonForm from "./NewLessonForm";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import { useGetLessonsQuery } from "./lessonsApiSlice";

const LESSON_NUMBER_REGEX = /^[0-9]{1,3}$/;

const NewLesson = () => {
	useTitle("LT IS: Tvorba lekce");
	const { tutoringId }: any = useParams();

	const { lessons } = useGetLessonsQuery("lessonsList", {
		selectFromResult: ({ data }: any) => ({
			lessons: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	let lastLessonNumber: number = 0;
	if (lessons) {
		let lessonNumbers: Array<number> = [0];
		for (let i = 0; i < lessons.length; i++) {
			if (lessons[i].tutoring === tutoringId) {
				lessonNumbers.push(lessons[i].lesson_number);
			}
		}

		lastLessonNumber = Math.max(...lessonNumbers);
		if (!LESSON_NUMBER_REGEX.test(String(lastLessonNumber))) {
			lastLessonNumber = 0;
		}
	} else {
		lastLessonNumber = 0;
	}

	const { isAdmin, isMentor, isLektor } = useAuth();

	if (!isAdmin && !isMentor && !isLektor) {
		return <div className="no_access">Access denied</div>;
	}
	const validLastLessonNumber = LESSON_NUMBER_REGEX.test(
		String(lastLessonNumber)
	);

	const content: JSX.Element =
		tutoringId && validLastLessonNumber ? (
			<NewLessonForm
				tutoring={tutoringId}
				lastLessonNumber={lastLessonNumber}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default NewLesson;
