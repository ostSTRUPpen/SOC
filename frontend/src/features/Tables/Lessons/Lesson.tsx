import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useGetLessonsQuery } from "./lessonsApiSlice";
import useAuth from "../../../hooks/useAuth";

const Lesson: any = ({ lessonId, tutoringId }: any) => {
	const { lesson } = useGetLessonsQuery("lessonsList", {
		selectFromResult: ({ data }: any) => ({
			lesson: data?.entities[lessonId],
		}),
	});

	const { isAdmin, isMentor, isLektor } = useAuth();

	const navigate = useNavigate();

	if (lesson) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const handleEdit = () => navigate(`/sec/lessons/${lessonId}`);
		const canEdit: boolean = isAdmin
			? true
			: isMentor
			? true
			: isLektor
			? true
			: false;

		let editing;
		if (canEdit) {
			editing = (
				<td className="table__cell">
					<button
						title="Upravit"
						className="icon-button table__button--edit"
						onClick={handleEdit}>
						<FontAwesomeIcon icon={faPenToSquare} />
					</button>
				</td>
			);
		} else {
			editing = <td className="table__cell" hidden></td>;
		}

		return (
			<tr className="table__row lesson">
				<td className="table__cell">{lesson.lesson_number}</td>
				<td className="table__cell">{lesson.date}</td>
				<td className="table__cell">{lesson.theme}</td>
				<td className="table__cell">{lesson.length}</td>
				<td className="table__cell">{lesson.info}</td>
				{editing}
			</tr>
		);
	} else return null;
};

export default Lesson;
