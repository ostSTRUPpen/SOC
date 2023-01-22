import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useGetInvoicesQuery } from "./invoicesApiSlice";
import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";
import { useGetClientsQuery } from "../Klients/clientsApiSlice";

import useAuth from "../../../hooks/useAuth";

const Invoice: any = ({ invoiceId }: any) => {
	const { invoice } = useGetInvoicesQuery("invoicesList", {
		selectFromResult: ({ data }: any) => ({
			invoice: data?.entities[invoiceId],
		}),
	});
	const { mentor } = useGetMentorsQuery("mentorsList", {
		selectFromResult: ({ data }: any) => ({
			mentor: data?.entities[invoice.mentor],
		}),
	});
	const { client } = useGetClientsQuery("clientsList", {
		selectFromResult: ({ data }: any) => ({
			client: data?.entities[invoice.client],
		}),
	});

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
