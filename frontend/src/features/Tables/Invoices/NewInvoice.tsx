import { useParams } from "react-router-dom";
import { selectAllLektors } from "../Lektors/lektorsApiSlice";
import { selectAllMentors } from "../Mentors/mentorsApiSlice";
import NewInvoiceForm from "./NewInvoiceForm";
import { useSelector } from "react-redux";

const NewInvoice = () => {
	const { mentorId } = useParams();

	const mentors = useSelector(selectAllMentors);
	const lektors = useSelector(selectAllLektors);

	const content: JSX.Element =
		/*mentorId && */ mentors && lektors ? (
			<NewInvoiceForm
				mentorId={mentorId}
				mentors={mentors}
				lektors={lektors}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default NewInvoice;
