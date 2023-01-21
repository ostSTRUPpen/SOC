import Salary from "./Salary";
import { useGetSalariesQuery } from "./salariesApiSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const SalaryList = () => {
	const { mentorId, lektorId }: any = useParams();
	const {
		data: tutorings,
		isLoading,
		isSuccess,
		error,
	} = useGetSalariesQuery("salaryList", {
		pollingInterval: 15000,
		refetchOnFocus: true,
		refetchOnMountOrArgChange: true,
	});

	let content: any;

	if (isLoading) {
		// Změnit na nějakou animaci
		content = <div className="loading"></div>;
	}
	if (error) {
		if ("status" in error) {
			// you can access all properties of `FetchBaseQueryError` here
			const errMsg =
				"error" in error ? error.error : JSON.stringify(error.data);

			return (
				<div>
					<div>Došlo k chybě:</div>
					<div>{errMsg}</div>
					<br />
					<p>
						<Link to={`/sec/salaries/new`}>
							Vytvořit první výplatu
						</Link>
					</p>
				</div>
			);
		} else {
			// you can access all properties of `SerializedError` here
			return <div>{error.message}</div>;
		}
	}

	if (isSuccess) {
		const { ids, entities } = tutorings;
		let filteredIds;
		if (mentorId === undefined && lektorId === undefined) {
			filteredIds = [...ids];
		} else if (mentorId !== undefined && lektorId === undefined) {
			filteredIds = ids.filter(
				(salaryId) => entities[salaryId].mentor === mentorId
			);
		} else if (mentorId === undefined && lektorId !== undefined) {
			filteredIds = ids.filter(
				(salaryId) => entities[salaryId].lektor === lektorId
			);
		} else {
			filteredIds = [...ids];
		}
		const tableContent = filteredIds?.length
			? filteredIds.map((salaryId: any) => (
					<Salary key={salaryId} salaryId={salaryId} />
			  ))
			: null;
		content = (
			<>
				<div>
					<table className="table table--salaries">
						<thead className="table_header">
							<tr>
								<th
									scope="col"
									className="table__th salary__mentor"
								>
									Mentor
								</th>
								<th
									scope="col"
									className="table__th salary__lektor"
								>
									Lektor
								</th>
								<th
									scope="col"
									className="table__th salary__date"
								>
									Datum
								</th>
								<th
									scope="col"
									className="table__th salary__value"
								>
									Částka
								</th>
							</tr>
						</thead>
						<tbody>{tableContent}</tbody>
					</table>
				</div>
				<br />
				<p>
					<Link to={`/sec/salaries/new`}>Nová výplata</Link>
				</p>
			</>
		);
	}

	return content;
};
export default SalaryList;
