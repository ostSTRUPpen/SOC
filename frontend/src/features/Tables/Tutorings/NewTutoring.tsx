import NewTutoringForm from "./NewTutoringForm";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import { useGetClientsQuery } from "../Klients/clientsApiSlice";
import { useGetLektorsQuery } from "../Lektors/lektorsApiSlice";

const NewTutoring = () => {
	useTitle("LT IS: Úprava doučování");

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
		lektors && clients ? (
			<NewTutoringForm lektors={lektors} clients={clients} />
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default NewTutoring;
