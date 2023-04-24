import { useGetTutoringsQuery } from "./tutoringsApiSlice";
import Tutoring from "./Tutoring";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import useAuth from "../../../hooks/useAuth";

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

	const { isAdmin, isMentor } = useAuth();

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
							<Link to={`/sec/tutorings/new`}>
								Vytvořit první doučování
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
				{(isAdmin || isMentor) && (
					<p className="align-center">
						<Link to={`/sec/tutorings/new`}>Nové doučování</Link>
					</p>
				)}
				<div className="table-responsive-div">
					<table className="table--tutorings table table-hover">
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
				{(isAdmin || isMentor) && (
					<p className="align-center">
						<Link to={`/sec/tutorings/new`}>Nové doučování</Link>
					</p>
				)}
			</div>
		);
	}

	return content;
};

export default TutoringsList;
