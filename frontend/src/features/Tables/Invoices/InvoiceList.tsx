import Invoice from "./Invoice";
import { useGetInvoicesQuery } from "./invoicesApiSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const InvoiceList = () => {
	const { mentorId, klientId }: any = useParams();
	const {
		data: tutorings,
		isLoading,
		isSuccess,
		error,
	} = useGetInvoicesQuery("");
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
						<Link to={`/sec/invoices/new`}>
							Vytvořit první fakturu
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
		if (mentorId === undefined && klientId === undefined) {
			filteredIds = [...ids];
		} else if (mentorId !== undefined && klientId === undefined) {
			filteredIds = ids.filter(
				(invoiceId) => entities[invoiceId].lektor === mentorId
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
			<>
				<table className="table table--invoices">
					<thead className="table_header">
						<tr>
							<th
								scope="col"
								className="table__th invoice__mentor"
							>
								Mentor
							</th>
							<th
								scope="col"
								className="table__th invoice__klient"
							>
								Klient
							</th>
							<th scope="col" className="table__th invoice__date">
								Datum
							</th>
							<th
								scope="col"
								className="table__th invoice__value"
							>
								Částka
							</th>
						</tr>
					</thead>
					<tbody>{tableContent}</tbody>
				</table>
				<br />
				<p>
					<Link to={`/sec/invoices/new`}>Nová faktura</Link>
				</p>
			</>
		);
	}

	return content;
};
export default InvoiceList;