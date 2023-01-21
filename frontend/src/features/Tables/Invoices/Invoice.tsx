import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectInvoiceById } from "./invoicesApiSlice";
import { selectMentorById } from "../Mentors/mentorsApiSlice";
import { selectClientById } from "../Klients/clientsApiSlice";

import useAuth from "../../../hooks/useAuth";

const Invoice: any = ({ invoiceId }: any) => {
	const invoice = useSelector((state) => selectInvoiceById(state, invoiceId));
	const mentor = useSelector((state) =>
		selectMentorById(state, invoice.mentor)
	);
	const client = useSelector((state) =>
		selectClientById(state, invoice.client)
	);

	const { isAdmin, isMentor } = useAuth();

	const navigate = useNavigate();

	if (invoice) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const handleEdit = () => navigate(`/sec/invoices/edit/${invoiceId}`);

		const canEdit: boolean = isAdmin ? true : isMentor ? true : false;

		let editing: JSX.Element;

		if (canEdit) {
			editing = (
				<button
					title="edit invoices"
					className="icon-button table__button--edi"
					onClick={handleEdit}>
					<FontAwesomeIcon icon={faPenToSquare} />
				</button>
			);
		} else {
			editing = <></>;
		}

		return (
			<tr className="table__row invoice">
				<td className="table__cell">{`${mentor.name} ${mentor.surname}`}</td>
				<td className="table__cell">
					{`${client.name_parent} ${client.surname_parent}`}
				</td>
				<td className="table__cell">{invoice.date}</td>
				<td className="table__cell">{invoice.value}</td>
				<td className="table__cell">{editing}</td>
			</tr>
		);
	} else return null;
};

export default Invoice;
