import { useParams } from "react-router-dom";
import { selectAllClients } from "../Klients/clientsApiSlice";
import { selectAllMentors } from "../Mentors/mentorsApiSlice";
import NewInvoiceForm from "./NewInvoiceForm";
import { useSelector } from "react-redux";

const NewInvoice = () => {
	const { mentorId } = useParams();

	const mentors = useSelector(selectAllMentors);
	const clients = useSelector(selectAllClients);

	const content: JSX.Element =
		/*mentorId && */ mentors && clients ? (
			<NewInvoiceForm
				mentorId={mentorId}
				mentors={mentors}
				clients={clients}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default NewInvoice;
