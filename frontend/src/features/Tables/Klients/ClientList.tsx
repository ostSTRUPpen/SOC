import { useGetClientsQuery } from "./clientsApiSlice";
import Client from "./Client";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";

const ClientsList = () => {
	useTitle("LT IS: List klientů");
	const { mentorId }: any = useParams();
	const {
		data: clients,
		isLoading,
		isSuccess,
		error,
	} = useGetClientsQuery("clientList", {
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
							<Link to="/sec/clients/new/">
								Vytvořit prvního klienta
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
			<div>
				<div>
					{(isAdmin || isMentor) && (
						<p className="align-center">
							<Link to="/sec/clients/new/">Přidat klienta</Link>{" "}
						</p>
					)}
					<div className="table-responsive-div">
						<table className="table table--clients">
							<thead className="table_header">
								<tr>
									<th
										scope="col"
										className="table__th client__mentor">
										Příslušný mentor
									</th>
									<th
										scope="col"
										className="table__th client__username">
										Uživatelské jméno
									</th>
									<th
										scope="col"
										className="table__th client_parent__name">
										Jméno rodiče
									</th>
									<th
										scope="col"
										className="table__th client_parent__surname">
										Příjmení rodiče
									</th>
									<th
										scope="col"
										className="table__th client_parent__gmail">
										g-mail rodiče
									</th>
									<th
										scope="col"
										className="table__th client_parent__email">
										e-mail rodiče
									</th>
									<th
										scope="col"
										className="table__th client_parent__phone_number">
										Telefoní číslo rodiče
									</th>
									<th
										scope="col"
										className="table__th client__bank_account">
										Bankovní účet
									</th>
									<th
										scope="col"
										className="table__th client_child__name">
										Jméno dítěte
									</th>
									<th
										scope="col"
										className="table__th client_child__surname">
										Příjmení dítěte
									</th>
									<th
										scope="col"
										className="table__th client_child__gmail">
										g-mail dítěte
									</th>
									<th
										scope="col"
										className="table__th client_child__email">
										e-mail dítěte
									</th>
									<th
										scope="col"
										className="table__th client_child__phone_number">
										Telefoní číslo dítěte
									</th>
									<th
										scope="col"
										className="table__th client_child__date_of_birth">
										Datum narození dítěte
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
						<Link to="/sec/clients/new/">Přidat klienta</Link>{" "}
					</p>
				)}
			</div>
		);
	}
	return content;
};

export default ClientsList;
