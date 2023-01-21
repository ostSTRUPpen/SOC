import { useParams } from "react-router-dom";
import EditLektorForm from "./EditLektorForm";
import { useGetLektorsQuery } from "./lektorsApiSlice";
import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const EditLektor = () => {
	useTitle("LT IS: Úprava lektora");
	const { id }: any = useParams();

	const { lektor } = useGetLektorsQuery("lektorsList", {
		selectFromResult: ({ data }: any) => ({
			lektor: data?.entities[id],
		}),
	});

	const { mentors } = useGetMentorsQuery("mentorsList", {
		selectFromResult: ({ data }: any) => ({
			mentors: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { isAdmin, isMentor, isLektor } = useAuth();

	if (!isAdmin && !isMentor && !isLektor) {
		return <div className="no_access">Access denied</div>;
	}

	const content: JSX.Element =
		lektor && mentors ? (
			<EditLektorForm lektor={lektor} mentors={mentors} />
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default EditLektor;
