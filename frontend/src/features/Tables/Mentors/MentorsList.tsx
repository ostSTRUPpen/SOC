import { useGetMentorsQuery } from "./mentorsApiSlice";
import Mentor from "./Mentor";
import { Link } from "react-router-dom";

const MentorsList = ({ amount, tutoringId }: any) => {
	const {
		data: mentors,
		isLoading,
		isSuccess,
		error,
	} = useGetMentorsQuery("");
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
		const { ids, entities } = mentors;

		let filteredIds;
		if (amount === "-1" && tutoringId === "") {
			filteredIds = [...ids];
		} else {
			filteredIds = ids.filter(
				(mentorId) => entities[mentorId].tutoring === tutoringId
			);
			//Kvůli složitosti dropuju Adamovu představu o zobrazení dvou osledních lekcí
			/*if (amount !== -1) {
				Math.max(...entities.map((o: any) => o.number));
			}*/
		}
		// console.log("0");
		const tableContent =
			ids?.length &&
			filteredIds.map((mentorId) => (
				<Mentor
					key={mentorId}
					mentorId={mentorId}
					tutoringId={tutoringId}
				/>
			));

		content = (
			<>
				<table className="table table--mentors">
					<thead className="table_header">
						<tr>
							<th
								scope="col"
								className="table__th mentor__number"
							>
								Číslo lekce
							</th>
							<th scope="col" className="table__th mentor__date">
								Datum lekce
							</th>
							<th scope="col" className="table__th mentor__theme">
								Téma lekce
							</th>
							<th
								scope="col"
								className="table__th mentor__length"
							>
								Délka lekce
							</th>
							<th scope="col" className="table__th mentor__info">
								Poznámka k lekci
							</th>
							<th scope="col" className="table__th mentor__edit">
								Upravit
							</th>
						</tr>
					</thead>
					<tbody>{tableContent}</tbody>
				</table>
				<p>
					<Link to={`/sec/mentors/new/${tutoringId}`}>
						Nová lekce
					</Link>
				</p>
			</>
		);
	}

	return content;
};

export default MentorsList;
