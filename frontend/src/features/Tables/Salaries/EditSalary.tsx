import { useParams } from "react-router-dom";
import { selectAllLektors } from "../Lektors/lektorsApiSlice";
import { selectAllMentors } from "../Mentors/mentorsApiSlice";
import { useSelector } from "react-redux";
import { selectSalaryById } from "./salariesApiSlice";
import EditSalaryForm from "./EditSalaryForm";

const EditSalary = () => {
	const { salaryId }: any = useParams();

	const salary = useSelector((state) => selectSalaryById(state, salaryId));

	const mentors = useSelector(selectAllMentors);
	const lektors = useSelector(selectAllLektors);

	const content: JSX.Element =
		salary && mentors && lektors ? (
			<EditSalaryForm
				salary={salary}
				mentors={mentors}
				lektors={lektors}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default EditSalary;
