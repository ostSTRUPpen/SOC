import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useGetTutoringsQuery } from "../Tables/Tutorings/tutoringsApiSlice";
import { useGetInvoicesQuery } from "../Tables/Invoices/invoicesApiSlice";
import { useGetSalariesQuery } from "../Tables/Salaries/salariesApiSlice";
import { useGetLessonsQuery } from "../Tables/Lessons/lessonsApiSlice";
import FinancesComp from "./FinancesComp";

const Finances = () => {
	const { tutoringId }: any = useParams();

	const { isAdmin, isMentor, isLektor, isClient, role } = useAuth();

	const { lessons } = useGetLessonsQuery("lessonsList", {
		selectFromResult: ({ data }: any) => ({
			lessons: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { tutoring } = useGetTutoringsQuery("tutoringsList", {
		selectFromResult: ({ data }: any) => ({
			tutoring: data?.entities[tutoringId],
		}),
	});

	const { invoices } = useGetInvoicesQuery("invoicesList", {
		selectFromResult: ({ data }: any) => ({
			invoices: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	const { salaries } = useGetSalariesQuery("salariesList", {
		selectFromResult: ({ data }: any) => ({
			salaries: data?.ids.map((id: any) => data?.entities[id]),
		}),
	});

	if (!isAdmin && !isMentor && !isLektor && !isClient) {
		return <div className="no_access">Access denied</div>;
	}

	const content: JSX.Element =
		tutoring && lessons && role && invoices && salaries ? (
			<FinancesComp
				tutoring={tutoring}
				lessons={lessons}
				invoices={invoices}
				salaries={salaries}
				role={role}
				salaryPerHour={150}
				pricePerHour={250}
			/>
		) : (
			<div className="loading"></div>
		);
	return content;
};

export default Finances;
