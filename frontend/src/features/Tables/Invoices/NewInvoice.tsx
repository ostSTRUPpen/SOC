import NewInvoiceForm from "./NewInvoiceForm";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import { useGetClientsQuery } from "../Klients/clientsApiSlice";
import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";
import { useGetTutoringsQuery } from "../Tutorings/tutoringsApiSlice";

const NewInvoice = () => {
	useTitle("LT IS: Tvorba faktury");

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
		mentors && clients && tutorings ? (
			<NewInvoiceForm
				mentors={mentors}
				clients={clients}
				tutorings={tutorings}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default NewInvoice;
