import { useParams } from "react-router-dom";
import EditTutoringForm from "./EditTutoringForm";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import { useGetClientsQuery } from "../Klients/clientsApiSlice";
import { useGetLektorsQuery } from "../Lektors/lektorsApiSlice";
import { useGetTutoringsQuery } from "./tutoringsApiSlice";

const EditTutoring = () => {
	useTitle("LT IS: Úprava doučování");
	const { tutoringId }: any = useParams();

	const { tutoring } = useGetTutoringsQuery("tutoringsList", {
		selectFromResult: ({ data }: any) => ({
			tutoring: data?.entities[tutoringId],
		}),
	});

	const { clients } = useGetClientsQuery("clientsList", {
		selectFromResult: ({ data }: any) => ({
			clients: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { lektors } = useGetLektorsQuery("lektorsList", {
		selectFromResult: ({ data }: any) => ({
			lektors: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { isAdmin, isMentor } = useAuth();

	if (!isAdmin && !isMentor) {
		return <div className="no_access">Access denied</div>;
	}

	const content: JSX.Element =
		tutoring && lektors && clients ? (
			<EditTutoringForm
				tutoring={tutoring}
				lektors={lektors}
				clients={clients}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default EditTutoring;
