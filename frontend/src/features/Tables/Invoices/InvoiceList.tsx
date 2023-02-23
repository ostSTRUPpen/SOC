import Invoice from "./Invoice";
import { useGetInvoicesQuery } from "./invoicesApiSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";

const InvoiceList = () => {
	useTitle("LT IS: List faktur");
	const { mentorId, klientId }: any = useParams();
	const {
		data: tutorings,
		isLoading,
		isSuccess,
		error,
	} = useGetInvoicesQuery("invoiceList", {
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
							<Link to={`/sec/invoices/new`}>
								Vytvořit první fakturu
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
		if (mentorId === undefined && klientId === undefined) {
			filteredIds = [...ids];
		} else if (mentorId !== undefined && klientId === undefined) {
			filteredIds = ids.filter(
				(invoiceId) => entities[invoiceId].mentor === mentorId
			);
		} else if (mentorId === undefined && klientId !== undefined) {
			filteredIds = ids.filter(
				(invoiceId) => entities[invoiceId].client === klientId
			);
		} else {
			filteredIds = [...ids];
		}

		const tableContent = filteredIds?.length
			? filteredIds.map((invoiceId: any) => (
					<Invoice key={invoiceId} invoiceId={invoiceId} />
			  ))
			: null;
		content = (
			<div>
				<div>
					{(isAdmin || isMentor) && (
						<p className="align-center">
							<Link to={`/sec/invoices/new`}>Nová faktura</Link>
						</p>
					)}
					<table className="table table--invoices">
						<thead className="table_header">
							<tr>
								<th
									scope="col"
									className="table__th invoice__number">
									Číslo faktury
								</th>
								<th
									scope="col"
									className="table__th invoice__mentor">
									Mentor
								</th>
								<th
									scope="col"
									className="table__th invoice__klient">
									Klient
								</th>
								<th
									scope="col"
									className="table__th invoice__date">
									Datum
								</th>
								<th
									scope="col"
									className="table__th invoice__value">
									Částka
								</th>
							</tr>
						</thead>
						<tbody>{tableContent}</tbody>
					</table>
				</div>
				<br />
				{(isAdmin || isMentor) && (
					<p className="align-center">
						<Link to={`/sec/invoices/new`}>Nová faktura</Link>
					</p>
				)}
			</div>
		);
	}

	return content;
};
export default InvoiceList;
