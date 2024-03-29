import Salary from "./Salary";
import { useGetSalariesQuery } from "./salariesApiSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";

const SalaryList = () => {
	useTitle("LT IS: List výplat");
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

	const { isAdmin, isMentor } = useAuth();

	let content: any;

	if (isLoading) {
		content = <div className="loading"></div>;
	}
	if (error) {
		if ("status" in error) {
			const errMsg =
				"error" in error ? error.error : JSON.stringify(error.data);

			return (
				<div>
					<div>Došlo k chybě:</div>
					<div>{errMsg}</div>
					<br />
					{(isAdmin || isMentor) && (
						<p>
							<Link to={`/sec/salaries/new`}>
								Vytvořit první výplatu
							</Link>
						</p>
					)}
				</div>
			);
		} else {
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
			<div>
				<div>
					{(isAdmin || isMentor) && (
						<p className="align-center">
							<Link to={`/sec/salaries/new`}>Nová výplata</Link>
						</p>
					)}
					<div className="table-responsive-div">
						<table className="table table--salaries">
							<thead className="table_header">
								<tr>
									<th
										scope="col"
										className="table__th salary__mentor">
										Mentor
									</th>
									<th
										scope="col"
										className="table__th salary__lektor">
										Lektor
									</th>
									<th
										scope="col"
										className="table__th salary__date">
										Datum
									</th>
									<th
										scope="col"
										className="table__th salary__value">
										Částka
									</th>
								</tr>
							</thead>
							<tbody>{tableContent}</tbody>
						</table>
					</div>
				</div>
				<br />
				{(isAdmin || isMentor) && (
					<p className="align-center">
						<Link to={`/sec/salaries/new`}>Nová výplata</Link>
					</p>
				)}
			</div>
		);
	}

	return content;
};
export default SalaryList;
