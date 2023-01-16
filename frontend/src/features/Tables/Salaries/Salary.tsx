import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectSalaryById } from "./salariesApiSlice";
import { selectMentorById } from "../Mentors/mentorsApiSlice";
import { selectLektorById } from "../Lektors/lektorsApiSlice";

const Salary: any = ({ salaryId }: any) => {
	const salary = useSelector((state) => selectSalaryById(state, salaryId));
	const mentor = useSelector((state) =>
		selectMentorById(state, salary.mentor)
	);
	const lektor = useSelector((state) =>
		selectLektorById(state, salary.lektor)
	);

	const navigate = useNavigate();

	if (salary) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const handleEdit = () => navigate(`/sec/salaries/edit/${salaryId}`);

		const canEdit: boolean = true;

		let editing: JSX.Element;

		if (canEdit) {
			editing = (
				<button
					title="edit salaries"
					className="icon-button table__button--edi"
					onClick={handleEdit}
				>
					<FontAwesomeIcon icon={faPenToSquare} />
				</button>
			);
		} else {
			editing = <></>;
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
