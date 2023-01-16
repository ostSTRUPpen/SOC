import { useParams } from "react-router-dom";
import { selectAllClients } from "../Klients/clientsApiSlice";
import { selectAllMentors } from "../Mentors/mentorsApiSlice";
import { useSelector } from "react-redux";
import { selectInvoiceById } from "./invoicesApiSlice";
import EditInvoiceForm from "./EditInvoiceForm";

const EditInvoice = () => {
	const { invoiceId }: any = useParams();

	const invoice = useSelector((state) => selectInvoiceById(state, invoiceId));

	const mentors = useSelector(selectAllMentors);
	const clients = useSelector(selectAllClients);

	const content: JSX.Element =
		invoice && mentors && clients ? (
			<EditInvoiceForm
				invoice={invoice}
				mentors={mentors}
				clients={clients}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default EditInvoice;
