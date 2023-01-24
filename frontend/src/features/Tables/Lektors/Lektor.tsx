import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useGetLektorsQuery } from "./lektorsApiSlice";
import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";
import { useGetTutoringsQuery } from "../Tutorings/tutoringsApiSlice";
import FinancesComp from "../../Finances/FinancesComp";
import { useGetLessonsQuery } from "../Lessons/lessonsApiSlice";
import { useGetSalariesQuery } from "../Salaries/salariesApiSlice";

const Lektor: any = ({ lektorId }: any) => {
	const { lektor } = useGetLektorsQuery("lektorsList", {
		selectFromResult: ({ data }: any) => ({
			lektor: data?.entities[lektorId],
		}),
	});
	const { mentor } = useGetMentorsQuery("mentorsList", {
		selectFromResult: ({ data }: any) => ({
			mentor: data?.entities[lektor.mentor],
		}),
	});

	const { tutorings } = useGetTutoringsQuery("tutoringsList", {
		selectFromResult: ({ data }: any) => ({
			tutorings: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { lessons } = useGetLessonsQuery("lessonsList", {
		selectFromResult: ({ data }: any) => ({
			lessons: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { salaries } = useGetSalariesQuery("salariesList", {
		selectFromResult: ({ data }: any) => ({
			salaries: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const navigate = useNavigate();

	if (lektor && mentor) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const handleViewTutorings = () =>
			navigate(`/sec/tutorings/show1/${lektorId}`);
		const handleEdit = () => navigate(`/sec/lektors/${lektorId}`);
		const canViewTutorings: boolean = true;
		const canEdit: boolean = true;

		let viewTutorings;
		if (canViewTutorings) {
			viewTutorings = (
				<td className="table__cell">
					<button
						title="Zobrazit doučování"
						className="icon-button table__button--view"
						onClick={handleViewTutorings}>
						<FontAwesomeIcon icon={faEye} />
					</button>
				</td>
			);
		} else {
			viewTutorings = <td className="table__cell" hidden></td>;
		}
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

		const financeInfo: JSX.Element = (
			<FinancesComp
				lessons={lessons}
				salaries={salaries}
				role={"lektor_list"}
				salaryPerHour={150}
				pricePerHour={250}
				lektor={lektor}
				tutorings={tutorings}
			/>
		);

		return (
			<tr className="table__row lektor">
				<td className="table__cell">{`${mentor.name} ${mentor.surname}`}</td>
				<td className="table__cell">{lektor.username}</td>
				<td className="table__cell">{lektor.name}</td>
				<td className="table__cell">{lektor.surname}</td>
				<td className="table__cell">{lektor.date_of_birth}</td>
				<td className="table__cell">{lektor.gmail}</td>
				<td className="table__cell">{lektor.email}</td>
				<td className="table__cell">{lektor.phone_num}</td>
				<td className="table__cell">{lektor.bank_account}</td>
				{financeInfo}
				{viewTutorings}
				{editing}
			</tr>
		);
	} else return null;
};

export default Lektor;
