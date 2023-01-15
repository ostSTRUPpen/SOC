import { useGetLektorsQuery } from "./lektorsApiSlice";
import Lektor from "./Lektor";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const LektorsList = () => {
	const { mentorId }: any = useParams();
	const {
		data: lektors,
		isLoading,
		isSuccess,
		error,
	} = useGetLektorsQuery("");
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
				</div>
			);
		} else {
			// you can access all properties of `SerializedError` here
			return <div>{error.message}</div>;
		}
	}

	if (isSuccess) {
		const { ids } = lektors;
		let tableContent;
		if (mentorId === undefined) {
			tableContent = ids?.length
				? ids.map((lektorId: any) => (
						<Lektor key={lektorId} lektorId={lektorId} />
				  ))
				: null;
		} else {
		}
		content = (
			<>
				<table className="table table--lektors">
					<thead className="table_header">
						<tr>
							<th
								scope="col"
								className="table__th lektor__mentor"
							>
								Příslušný mentor
							</th>
							<th
								scope="col"
								className="table__th lektor__username"
							>
								Uživatelské jméno
							</th>
							<th scope="col" className="table__th lektor__name">
								Jméno
							</th>
							<th
								scope="col"
								className="table__th lektor__surname"
							>
								Příjmení
							</th>
							<th
								scope="col"
								className="table__th lektor__date_of_birth"
							>
								Datum narození
							</th>
							<th scope="col" className="table__th lektor__gmail">
								g-mail
							</th>
							<th scope="col" className="table__th lektor__email">
								e-email
							</th>
							<th
								scope="col"
								className="table__th lektor__phone_number"
							>
								Telefoní číslo
							</th>
							<th
								scope="col"
								className="table__th lektor__bank_account"
							>
								Bankovní účet
							</th>
						</tr>
					</thead>
					<tbody>{tableContent}</tbody>
				</table>
				<br />
				<p>
					<Link to="/sec/lektors/new/">Přidat lektora</Link>
				</p>
			</>
		);
	}
	return content;
};

export default LektorsList;
