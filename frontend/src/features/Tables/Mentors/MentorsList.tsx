import React from "react";
import { useGetMentorsQuery } from "./mentorsApiSlice";
import { Link } from "react-router-dom";
import Mentor from "./Mentor";

const MentorsList = () => {
	const {
		data: mentors,
		isLoading,
		isSuccess,
		error,
	} = useGetMentorsQuery("");

	let content: JSX.Element;

	if (isLoading) {
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
						<Link to="/sec/mentors/new/">
							Vytvořit prvního mentora
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
		const { ids } = mentors;
		let tableContent;
		tableContent = ids?.length
			? ids.map((mentorId: any) => (
					<Mentor key={mentorId} mentorId={mentorId} />
			  ))
			: null;

		content = (
			<>
				<table className="table table--mentors">
					<thead className="table_header">
						<tr>
							<th
								scope="col"
								className="table__th mentor__username"
							>
								Uživatelské jméno
							</th>
							<th scope="col" className="table__th mentor__name">
								Jméno
							</th>
							<th
								scope="col"
								className="table__th mentor__surname"
							>
								Příjmení
							</th>
							<th
								scope="col"
								className="table__th mentor__date_of_birth"
							>
								Datum narození
							</th>
							<th scope="col" className="table__th mentor__gmail">
								g-mail
							</th>
							<th scope="col" className="table__th mentor__email">
								e-email
							</th>
							<th
								scope="col"
								className="table__th mentor__phone_number"
							>
								Telefoní číslo
							</th>
							<th
								scope="col"
								className="table__th mentor__bank_account"
							>
								Bankovní účet
							</th>
						</tr>
					</thead>
					<tbody>{tableContent}</tbody>
				</table>
				<br />
				<p>
					<Link to={"/sec/mentors/new"}>Vytvořit mentora</Link>
				</p>
			</>
		);
		return content;
	}
	return <div>Došlo k chybě</div>;
};

export default MentorsList;
