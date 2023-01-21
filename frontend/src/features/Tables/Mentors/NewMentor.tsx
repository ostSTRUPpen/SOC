import NewMentorForm from "./NewMentorForm";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const NewMentor = () => {
	useTitle("LT IS: Tvorba mentora");
	const { isAdmin } = useAuth();

	if (!isAdmin) {
		return <div className="no_access">Access denied</div>;
	}

	const content: JSX.Element = <NewMentorForm />;
	return content;
};

export default NewMentor;
