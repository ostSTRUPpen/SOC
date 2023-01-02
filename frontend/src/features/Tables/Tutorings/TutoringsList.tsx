import { useGetTutoringsQuery } from "./tutoringsApiSlice";
import Tutoring from "./Tutoring";

// TOHLE CELÉ SE MUSÍ PŘEPSAT - NEPLNÍ TO FUNKCI
/*
Potřebuji pouze tutorings pro příslošné ID lektora/klienta
Ty následně musím rozdělit do více tabulek (viz MIRO)
Pro každé tutoring musím získat poslední dvě lekce pro dané tutoring ID a přiřadit je do příslušné tabulky
Každá tabulka musí být zároveň odkaz na správu všech zapsaných lekcí daného doučování
*/

const TutoringsList = () => {
	const {
		data: tutorings,
		isLoading,
		isSuccess,
		error,
	} = useGetTutoringsQuery("");
	let content: any;

	if (isLoading) {
		// Změnit na nějakou animaci
		content = <p>Načítání</p>;
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
		const { ids } = tutorings;

		const tableContent = ids?.length
			? ids.map((tutoringId: any) => (
					<Tutoring key={tutoringId} tutoringId={tutoringId} />
			  ))
			: null;
		content = (
			<table className="table table--lessons">
				<thead className="table_header">
					<tr>
						<th scope="col" className="table__th tutoring__lektor">
							Lektor
						</th>
						<th scope="col" className="table__th tutoring__klient">
							Klient
						</th>
						<th scope="col" className="table__th tutoring__theme">
							Předmět
						</th>
					</tr>
				</thead>
				<tbody>{tableContent}</tbody>
			</table>
		);
	}

	return content;
};

export default TutoringsList;
