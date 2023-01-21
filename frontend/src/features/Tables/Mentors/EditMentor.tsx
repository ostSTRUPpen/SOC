import { useParams } from "react-router-dom";
import EditMentorForm from "./EditMentorForm";
import { useGetMentorsQuery } from "./mentorsApiSlice";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const EditMentor = () => {
	useTitle("LT IS: Úprava mentora");
	const { id }: any = useParams();

	const { mentor } = useGetMentorsQuery("mentorsList", {
		selectFromResult: ({ data }: any) => ({
			mentor: data?.entities[id],
		}),
	});

	const { isAdmin, isMentor } = useAuth();

	if (!isAdmin && !isMentor) {
		return <div className="no_access">Access denied</div>;
	}

	const content: JSX.Element = mentor ? (
		<EditMentorForm mentor={mentor} />
	) : (
		<div className="loading"></div>
	);
	return content;
};

export default EditMentor;
