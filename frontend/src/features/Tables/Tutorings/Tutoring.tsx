import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEye,
	faPenToSquare,
	faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useGetClientsQuery } from "../Klients/clientsApiSlice";
import { useGetLektorsQuery } from "../Lektors/lektorsApiSlice";
import { useGetTutoringsQuery } from "./tutoringsApiSlice";
import { useGetLessonsQuery } from "../Lessons/lessonsApiSlice";
import FinancesComp from "../../Finances/FinancesComp";
import { useGetInvoicesQuery } from "../Invoices/invoicesApiSlice";
import { useGetSalariesQuery } from "../Salaries/salariesApiSlice";

const Tutoring: any = ({ tutoringId }: any) => {
	const { tutoring } = useGetTutoringsQuery("tutoringsList", {
		selectFromResult: ({ data }: any) => ({
			tutoring: data?.entities[tutoringId],
		}),
	});
	const { client } = useGetClientsQuery("clientsList", {
		selectFromResult: ({ data }: any) => ({
			client: data?.entities[tutoring.client],
		}),
	});
	const { lektor } = useGetLektorsQuery("lektorsList", {
		selectFromResult: ({ data }: any) => ({
			lektor: data?.entities[tutoring.lektor],
		}),
	});

	const { lessons } = useGetLessonsQuery("lessonsList", {
		selectFromResult: ({ data }: any) => ({
			lessons: data?.ids.map((id: any) => data?.entities[id]),
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

	const { isAdmin, isMentor } = useAuth();

	const navigate = useNavigate();

	if (tutoring) {
		// Upravit, tak aby to pracovalo dle plánu TODO (pravděpodobně jako funkci, která to handlne, ale bez načítání stránky)
		const displayLessons = () => navigate(`/sec/tutorings/${tutoringId}`);
		const handleEdit = () => navigate(`/sec/tutorings/edit/${tutoringId}`);
		const displayFinances = () => navigate(`/sec/finances/${tutoringId}`);
		const isActive = tutoring.active ? "" : "table__cell--inactive";

		const canEdit: boolean = isAdmin ? true : isMentor ? true : false;

		let editing: JSX.Element;

		if (canEdit) {
			editing = (
				<button
					title="Upravit"
					className="icon-button table__button--edi"
					onClick={handleEdit}>
					<FontAwesomeIcon icon={faPenToSquare} />
				</button>
			);
		} else {
			editing = <div></div>;
		}

		const financeInfo: JSX.Element = (
			<FinancesComp
				tutoring={tutoring}
				lessons={lessons}
				invoices={invoices}
				salaries={salaries}
				role={"tutoring"}
				salaryPerHour={150}
				pricePerHour={250}
			/>
		);

		return (
			<tr className="table__row tutoring">
				<td
					className={`table__cell ${isActive}`}>{`${lektor.name} ${lektor.surname}`}</td>
				<td className={`table__cell ${isActive}`}>
					{`${client.name_child} ${client.surname_child}`}
				</td>
				<td className={`table__cell ${isActive}`}>
					{tutoring.subject}
				</td>
				{financeInfo}
				<td className="table__cell">
					<button
						title="Zobrazit lekce"
						className="icon-button table__button--view"
						onClick={displayLessons}>
						<FontAwesomeIcon icon={faEye} />
					</button>
					<button
						title="Finance"
						className="icon-button table__button--view"
						onClick={displayFinances}>
						<FontAwesomeIcon icon={faWallet} />
					</button>
					{editing}
				</td>
			</tr>
		);
	} else return null;
};

export default Tutoring;
