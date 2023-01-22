import { useGetTutoringsQuery } from "./tutoringsApiSlice";
import Tutoring from "./Tutoring";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const TutoringsList = () => {
	useTitle("LT IS: List doučování");
	const { lektorId, klientId, mentorId }: any = useParams();
	const {
		data: tutorings,
		isLoading,
		isSuccess,
		error,
	} = useGetTutoringsQuery("tutoringsList", {
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
						<Link to={`/sec/tutorings/new`}>
							Vytvořit první doučování
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
		if (
			lektorId === undefined &&
			klientId === undefined &&
			mentorId === undefined
		) {
			filteredIds = [...ids];
		} else if (
			lektorId !== undefined &&
			klientId === undefined &&
			mentorId === undefined
		) {
			filteredIds = ids.filter(
				(tutoringId) => entities[tutoringId].lektor === lektorId
			);
		} else if (
			lektorId === undefined &&
			klientId !== undefined &&
			mentorId === undefined
		) {
			filteredIds = ids.filter(
				(tutoringId) => entities[tutoringId].client === klientId
			);
		} else if (
			lektorId === undefined &&
			klientId === undefined &&
			mentorId !== undefined
		) {
			// TODO ? Musí z tutoring dostat ID lektora a podle něj získat lektora a z něj dostat ID mentora
			filteredIds = [...ids];
		} else {
			filteredIds = [...ids];
		}
		const tableContent = filteredIds?.length
			? filteredIds.map((tutoringId: any) => (
					<Tutoring key={tutoringId} tutoringId={tutoringId} />
			  ))
			: null;
		content = (
			<div>
				<div>
					<table className="table table--tutorings">
						<thead className="table_header">
							<tr>
								<th
									scope="col"
									className="table__th tutoring__lektor">
									Lektor
								</th>
								<th
									scope="col"
									className="table__th tutoring__klient">
									Klient
								</th>
								<th
									scope="col"
									className="table__th tutoring__theme">
									Předmět
								</th>
								<th
									scope="col"
									className="table__th tutoring__theme">
									Proběhlé lekce
								</th>
								<th
									scope="col"
									className="table__th tutoring__theme">
									Předplacenné lekce
								</th>
								<th
									scope="col"
									className="table__th tutoring__theme">
									Bilance lektora
								</th>
								<th
									scope="col"
									className="table__th tutoring__theme">
									Bilance klienta
								</th>
							</tr>
						</thead>
						<tbody>{tableContent}</tbody>
					</table>
					<br />
				</div>
				<p>
					<Link to={`/sec/tutorings/new`}>Nové doučování</Link>
				</p>
			</div>
		);
	}

	return content;
};

export default TutoringsList;
