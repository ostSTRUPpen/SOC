import { useParams } from "react-router-dom";
import EditClientForm from "./EditClientForm";
import { useGetClientsQuery } from "./clientsApiSlice";
import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const EditClient = () => {
	useTitle("LT IS: Úprava klienta");
	const { id }: any = useParams();

	const { client } = useGetClientsQuery("clientsList", {
		selectFromResult: ({ data }: any) => ({
			client: data?.entities[id],
		}),
	});

	const { mentors } = useGetMentorsQuery("mentorsList", {
		selectFromResult: ({ data }: any) => ({
			mentors: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { isAdmin, isMentor, isClient } = useAuth();

	if (!isAdmin && !isMentor && !isClient) {
		return <div className="no_access">Access denied</div>;
	}

	const content: JSX.Element =
		client && mentors ? (
			<EditClientForm client={client} mentors={mentors} />
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default EditClient;
