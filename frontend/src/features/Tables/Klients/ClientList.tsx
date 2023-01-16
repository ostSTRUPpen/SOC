import { useGetClientsQuery } from "./clientsApiSlice";
import Client from "./Client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const ClientsList = () => {
	const { mentorId }: any = useParams();
	const {
		data: clients,
		isLoading,
		isSuccess,
		error,
	} = useGetClientsQuery("");
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
						<Link to="/sec/clients/new/">
							Vytvořit prvního klienta
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
		const { ids, entities } = clients;
		let tableContent;
		let filteredIds;
		if (mentorId === undefined) {
			filteredIds = [...ids];
		} else {
			filteredIds = ids.filter(
				(clientId) => entities[clientId].mentor === mentorId
			);
		}

		tableContent = filteredIds?.length
			? filteredIds.map((clientId: any) => (
					<Client key={clientId} clientId={clientId} />
			  ))
			: null;
		content = (
			<>
				<table className="table table--clients">
					<thead className="table_header">
						<tr>
							<th
								scope="col"
								className="table__th client__mentor"
							>
								Příslušný mentor
							</th>
							<th
								scope="col"
								className="table__th client__username"
							>
								Uživatelské jméno
							</th>
							<th
								scope="col"
								className="table__th client_parent__name"
							>
								Jméno rodiče
							</th>
							<th
								scope="col"
								className="table__th client_parent__surname"
							>
								Příjmení rodiče
							</th>
							<th
								scope="col"
								className="table__th client_parent__gmail"
							>
								g-mail rodiče
							</th>
							<th
								scope="col"
								className="table__th client_parent__email"
							>
								e-email rodiče
							</th>
							<th
								scope="col"
								className="table__th client_parent__phone_number"
							>
								Telefoní číslo rodiče
							</th>
							<th
								scope="col"
								className="table__th client__bank_account"
							>
								Bankovní účet
							</th>
							<th
								scope="col"
								className="table__th client_child__name"
							>
								Jméno dítěte
							</th>
							<th
								scope="col"
								className="table__th client_child__surname"
							>
								Příjmení dítěte
							</th>
							<th
								scope="col"
								className="table__th client_child__gmail"
							>
								g-mail dítěte
							</th>
							<th
								scope="col"
								className="table__th client_child__email"
							>
								e-email dítěte
							</th>
							<th
								scope="col"
								className="table__th client_child__phone_number"
							>
								Telefoní číslo dítěte
							</th>
							<th
								scope="col"
								className="table__th client_child__date_of_birth"
							>
								Datum narození dítěte
							</th>
						</tr>
					</thead>
					<tbody>{tableContent}</tbody>
				</table>
				<br />
				<p>
					<Link to="/sec/clients/new/">Přidat klienta</Link>
				</p>
			</>
		);
	}
	return content;
};

export default ClientsList;
