import { useGetLektorsQuery } from "../Lektors/lektorsApiSlice";
import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";
import { useGetTutoringsQuery } from "../Tutorings/tutoringsApiSlice";
import NewSalaryForm from "./NewSalaryForm";
import useAuth from "../../../hooks/useAuth";
import useTitle from "../../../hooks/useTitle";

const NewSalary = () => {
	useTitle("LT IS: Tvorba výplaty");

	const { mentors } = useGetMentorsQuery("mentorsList", {
		selectFromResult: ({ data }: any) => ({
			mentors: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { lektors } = useGetLektorsQuery("lektorsList", {
		selectFromResult: ({ data }: any) => ({
			lektors: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { tutorings } = useGetTutoringsQuery("tutoringsList", {
		selectFromResult: ({ data }: any) => ({
			tutorings: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { isAdmin, isMentor } = useAuth();

	if (!isAdmin && !isMentor) {
		return <div className="no_access">Access denied</div>;
	}

	const content: JSX.Element =
		mentors && lektors && tutorings ? (
			<NewSalaryForm
				mentors={mentors}
				lektors={lektors}
				tutorings={tutorings}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default NewSalary;
