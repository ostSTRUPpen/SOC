import { useGetLessonsQuery } from "./lessonsApiSlice";
import Lesson from "./Lesson";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import { useGetTutoringsQuery } from "../Tutorings/tutoringsApiSlice";

const LessonsList = ({ amount, tutoringId }: any) => {
	useTitle("LT IS: List lekcí");
	const {
		data: lessons,
		isLoading,
		isSuccess,
		error,
	} = useGetLessonsQuery("lessonsList", {
		pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	const { tutoring } = useGetTutoringsQuery("tutoringsList", {
		selectFromResult: ({ data }: any) => ({
			tutoring: data?.entities[tutoringId],
		}),
	});

	const { isAdmin, isMentor, isLektor } = useAuth();

	let content: any;

	if (isLoading) {
		content = <div className="loading"></div>;
	}
	if (error) {
		if ("status" in error) {
			const errMsg =
				"error" in error ? error.error : JSON.stringify(error.data);

			return (
				<div>
					<div>Došlo k chybě:</div>
					<div>{errMsg}</div>
					<br />
					{(isAdmin || isMentor || isLektor) && (
						<p>
							<Link to={`/sec/lessons/new/${tutoringId}`}>
								Vytvořit první lekci
							</Link>
						</p>
					)}
				</div>
			);
		} else {
			return <div>{error.message}</div>;
		}
	}
	if (isSuccess) {
		const { ids, entities } = lessons;

		let filteredIds;
		if (amount === "-1" && tutoringId === "") {
			filteredIds = [...ids];
		} else {
			filteredIds = ids.filter(
				(lessonId) => entities[lessonId].tutoring === tutoringId
			);
		}
		const tableContent =
			filteredIds?.length &&
			filteredIds.map((lessonId) => (
				<Lesson
					key={lessonId}
					lessonId={lessonId}
					tutoringId={tutoringId}
				/>
			));

		content = (
			<div>
				<div>
					<h5>
						{tutoring.name}, Předmět: {tutoring.subject}
					</h5>
					<table className="table table--lessons">
						<thead className="table_header">
							<tr>
								<th
									scope="col"
									className="table__th lesson__number">
									Číslo lekce
								</th>
								<th
									scope="col"
									className="table__th lesson__date">
									Datum lekce
								</th>
								<th
									scope="col"
									className="table__th lesson__theme">
									Téma lekce
								</th>
								<th
									scope="col"
									className="table__th lesson__length">
									Délka lekce
								</th>
								<th
									scope="col"
									className="table__th lesson__info">
									Poznámka k lekci
								</th>
								<th
									scope="col"
									className="table__th lesson__edit">
									Upravit
								</th>
							</tr>
						</thead>
						<tbody>{tableContent}</tbody>
					</table>
				</div>
				<br />
				{(isAdmin || isMentor || isLektor) && (
					<p>
						<Link to={`/sec/lessons/new/${tutoringId}`}>
							Nová lekce
						</Link>
					</p>
				)}
			</div>
		);
	}

	return content;
};

export default LessonsList;
