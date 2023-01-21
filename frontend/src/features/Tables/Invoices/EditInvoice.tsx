import { useParams } from "react-router-dom";
import { useGetClientsQuery } from "../Klients/clientsApiSlice";
import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";
import { useGetInvoicesQuery } from "./invoicesApiSlice";
import { useGetTutoringsQuery } from "../Tutorings/tutoringsApiSlice";
import EditInvoiceForm from "./EditInvoiceForm";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";

const EditInvoice = () => {
	useTitle("LT IS: Úprava faktury");
	const { invoiceId }: any = useParams();

	const { invoice } = useGetInvoicesQuery("invoicesList", {
		selectFromResult: ({ data }: any) => ({
			invoice: data?.entities[invoiceId],
		}),
	});

	const { mentors } = useGetMentorsQuery("mentorsList", {
		selectFromResult: ({ data }: any) => ({
			mentors: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { clients } = useGetClientsQuery("clientsList", {
		selectFromResult: ({ data }: any) => ({
			clients: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { tutorings } = useGetTutoringsQuery("tutoringsList", {
		selectFromResult: ({ data }: any) => ({
			tutorings: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { isAdmin, isMentor } = useAuth();

	if (!isAdmin && !isMentor) {
		return <div className="no_access">Access denied</div>;
	}

	const content: JSX.Element =
		invoice && mentors && clients && tutorings ? (
			<EditInvoiceForm
				invoice={invoice}
				mentors={mentors}
				clients={clients}
				tutorings={tutorings}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default EditInvoice;
