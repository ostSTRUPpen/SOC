import { useParams } from "react-router-dom";
import { selectAllClients } from "../Klients/clientsApiSlice";
import { selectAllLektors } from "../Lektors/lektorsApiSlice";
import { useSelector } from "react-redux";
import { selectTutoringById } from "./tutoringsApiSlice";
import EditTutoringForm from "./EditTutoringForm";

const EditTutoring = () => {
	const { tutoringId }: any = useParams();

	const tutoring = useSelector((state) =>
		selectTutoringById(state, tutoringId)
	);
	const lektors = useSelector(selectAllLektors);
	const clients = useSelector(selectAllClients);

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
