import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";
import NewClientForm from "./NewClientForm";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const NewClient = () => {
	useTitle("LT IS: Tvorba klienta");

	const { mentors } = useGetMentorsQuery("mentorsList", {
		selectFromResult: ({ data }: any) => ({
			mentors: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { isAdmin, isMentor } = useAuth();

	if (!isAdmin && !isMentor) {
		return <div className="no_access">Access denied</div>;
	}

	const content: JSX.Element = mentors ? (
		<NewClientForm mentors={mentors} />
	) : (
		<div className="loading"></div>
	);
	return content;
};

export default NewClient;
