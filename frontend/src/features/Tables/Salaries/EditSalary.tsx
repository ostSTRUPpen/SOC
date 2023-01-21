import { useParams } from "react-router-dom";
import { useGetTutoringsQuery } from "../Tutorings/tutoringsApiSlice";
import { useGetMentorsQuery } from "../Mentors/mentorsApiSlice";
import { useGetSalariesQuery } from "./salariesApiSlice";
import EditSalaryForm from "./EditSalaryForm";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";
import { useGetLektorsQuery } from "../Lektors/lektorsApiSlice";

const EditSalary = () => {
	useTitle("LT IS: Úprava výplaty");
	const { salaryId }: any = useParams();

	const { salary } = useGetSalariesQuery("salariesList", {
		selectFromResult: ({ data }: any) => ({
			salary: data?.entities[salaryId],
		}),
	});

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
		salary && mentors && lektors && tutorings ? (
			<EditSalaryForm
				salary={salary}
				mentors={mentors}
				lektors={lektors}
				tutorings={tutorings}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default EditSalary;
