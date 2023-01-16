import { useParams } from "react-router-dom";
import { selectAllLektors } from "../Lektors/lektorsApiSlice";
import { selectAllMentors } from "../Mentors/mentorsApiSlice";
import NewSalaryForm from "./NewSalaryForm";
import { useSelector } from "react-redux";

const NewSalary = () => {
	const { mentorId } = useParams();

	const mentors = useSelector(selectAllMentors);
	const lektors = useSelector(selectAllLektors);

	const content: JSX.Element =
		/*mentorId && */ mentors && lektors ? (
			<NewSalaryForm
				mentorId={mentorId}
				mentors={mentors}
				lektors={lektors}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default NewSalary;
