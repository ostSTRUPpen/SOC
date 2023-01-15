import { useParams } from "react-router-dom";
import { selectAllClients } from "../Klients/clientsApiSlice";
import { selectAllLektors } from "../Lektors/lektorsApiSlice";
import NewTutoringForm from "./NewTutoringForm";
import { useSelector } from "react-redux";

const NewTutoring = () => {
	const { mentorId } = useParams();

	const lektors = useSelector(selectAllLektors);
	const clients = useSelector(selectAllClients);

	const content: JSX.Element =
		/*mentorId && */ lektors && clients ? (
			<NewTutoringForm
				mentor={mentorId}
				lektors={lektors}
				clients={clients}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default NewTutoring;
