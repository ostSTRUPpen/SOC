import NewLektorForm from "./NewLektorForm";
import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";
const NewLektor = () => {
	useTitle("LT IS: Tvorba lektora");

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
		<NewLektorForm mentors={mentors} />
	) : (
		<div className="loading"></div>
	);
	return content;
};

export default NewLektor;
