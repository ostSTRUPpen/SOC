import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useGetSalariesQuery } from "./salariesApiSlice";
import { useGetLektorsQuery } from "../Lektors/lektorsApiSlice";
import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";

const Salary: any = ({ salaryId }: any) => {
	const { salary } = useGetSalariesQuery("salariesList", {
		selectFromResult: ({ data }: any) => ({
			salary: data?.entities[salaryId],
		}),
	});
	const { mentor } = useGetMentorsQuery("mentorsList", {
		selectFromResult: ({ data }: any) => ({
			mentor: data?.entities[salary.mentor],
		}),
	});
	const { lektor } = useGetLektorsQuery("lektorsList", {
		selectFromResult: ({ data }: any) => ({
			lektor: data?.entities[salary.lektor],
		}),
	});

	const { isAdmin, isMentor } = useAuth();

	const navigate = useNavigate();

	if (salary) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const handleEdit = () => navigate(`/sec/salaries/edit/${salaryId}`);

		const canEdit: boolean = isAdmin ? true : isMentor ? true : false;

		let editing: JSX.Element;

		if (canEdit) {
			editing = (
				<button
					title="Upravit"
					className="icon-button table__button--edi"
					onClick={handleEdit}>
					<FontAwesomeIcon icon={faPenToSquare} />
				</button>
			);
		} else {
			editing = <div></div>;
		}

		return (
			<tr className="table__row salary">
				<td className="table__cell">{`${mentor.name} ${mentor.surname}`}</td>
				<td className="table__cell">
					{`${lektor.name} ${lektor.surname}`}
				</td>
				<td className="table__cell">{salary.date}</td>
				<td className="table__cell">{salary.value}</td>
				<td className="table__cell">{editing}</td>
			</tr>
		);
	} else return null;
};

export default Salary;
