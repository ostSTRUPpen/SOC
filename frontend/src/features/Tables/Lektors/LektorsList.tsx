import { useGetLektorsQuery } from "./lektorsApiSlice";
import Lektor from "./Lektor";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";

const LektorsList = () => {
	useTitle("LT IS: List lektorů");
	const { mentorId }: any = useParams();
	const {
		data: lektors,
		isLoading,
		isSuccess,
		error,
	} = useGetLektorsQuery("lektorsList", {
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
							<Link to="/sec/lektors/new/">
								Vytvořit prvního lektora
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
		const { ids, entities } = lektors;
		let tableContent;
		let filteredIds;
		if (mentorId === undefined) {
			filteredIds = [...ids];
		} else {
			filteredIds = ids.filter(
				(lektorId) => entities[lektorId].mentor === mentorId
			);
		}

		tableContent = filteredIds?.length
			? filteredIds.map((lektorId: any) => (
					<Lektor key={lektorId} lektorId={lektorId} />
			  ))
			: null;

		content = (
			<div>
				<div>
					<table className="table table--lektors">
						<thead className="table_header">
							<tr>
								<th
									scope="col"
									className="table__th lektor__mentor">
									Příslušný mentor
								</th>
								<th
									scope="col"
									className="table__th lektor__username">
									Uživatelské jméno
								</th>
								<th
									scope="col"
									className="table__th lektor__name">
									Jméno
								</th>
								<th
									scope="col"
									className="table__th lektor__surname">
									Příjmení
								</th>
								<th
									scope="col"
									className="table__th lektor__date_of_birth">
									Datum narození
								</th>
								<th
									scope="col"
									className="table__th lektor__gmail">
									g-mail
								</th>
								<th
									scope="col"
									className="table__th lektor__email">
									e-email
								</th>
								<th
									scope="col"
									className="table__th lektor__phone_number">
									Telefoní číslo
								</th>
								<th
									scope="col"
									className="table__th lektor__bank_account">
									Bankovní účet
								</th>
								<th
									scope="col"
									className="table__th lektor__bank_account">
									Proběhlé lekce celkem
								</th>
								<th
									scope="col"
									className="table__th lektor__bank_account">
									Bilance
								</th>
								<th
									scope="col"
									className="table__th lektor__bank_account">
									Celkem doučování
								</th>
							</tr>
						</thead>
						<tbody>{tableContent}</tbody>
					</table>
				</div>
				<br />
				{(isAdmin || isMentor) && (
					<p>
						<Link to="/sec/lektors/new/">Přidat lektora</Link>
					</p>
				)}
			</div>
		);
	}
	return content;
};

export default LektorsList;
