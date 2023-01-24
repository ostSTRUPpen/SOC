import React from "react";
import { ROLES } from "../../config/roles";

const FinancesComp = ({
	tutoring,
	lessons,
	invoices,
	salaries,
	role,
	salaryPerHour,
	pricePerHour,
	lektor,
	tutorings,
}: any) => {
	let content: JSX.Element = <div></div>;
	if (tutoring && role !== "lektor_list") {
		const mentorPerHour = pricePerHour - salaryPerHour;
		let sortedLessons: Array<any> = [];
		for (let i = 0; i < lessons.length; i++) {
			if (lessons[i].tutoring === tutoring.id) {
				sortedLessons.push(lessons[i]);
			}
		}

		let sortedInvoices: Array<any> = [];
		for (let i = 0; i < invoices.length; i++) {
			if (invoices[i].tutoring === tutoring.id) {
				sortedInvoices.push(invoices[i]);
			}
		}
		let sortedSalaries: Array<any> = [];
		for (let i = 0; i < salaries.length; i++) {
			if (salaries[i].tutoring === tutoring.id) {
				sortedSalaries.push(salaries[i]);
			}
		}

		// Finished lessons
		let lessonLengthSum: number = 0;
		for (let i = 0; i < sortedLessons.length; i++) {
			lessonLengthSum += sortedLessons[i].length;
		}
		const tutoringHours = parseFloat((lessonLengthSum / 60).toFixed(5));
		const lektorProfit = parseFloat(
			((lessonLengthSum / 60) * salaryPerHour).toFixed(5)
		);
		const clientCost = parseFloat(
			((lessonLengthSum / 60) * pricePerHour).toFixed(5)
		);
		const mentorProfit = parseFloat(
			((lessonLengthSum / 60) * mentorPerHour).toFixed(5)
		);

		//Salaries
		let salariesAmoutSum: number = 0;
		for (let i = 0; i < sortedSalaries.length; i++) {
			salariesAmoutSum += Number(sortedSalaries[i].value);
		}
		const lektorGotPaidAmount = salariesAmoutSum;
		const lektorNeedsToGetPaid = lektorProfit - lektorGotPaidAmount;

		//Invoices
		let invoicesAmoutSum: number = 0;
		for (let i = 0; i < sortedInvoices.length; i++) {
			invoicesAmoutSum += Number(sortedInvoices[i].value);
		}
		const clientPaidAmount = invoicesAmoutSum;
		const clientNeedsToPay = clientCost - clientPaidAmount;

		//Prepaid lessons
		const prepaidLessons = parseFloat(
			(clientPaidAmount / pricePerHour - tutoringHours).toFixed(5)
		);

		const tutoringHoursColor = "green";
		const prepaidLessonsColor =
			prepaidLessons < 0 ? "red" : prepaidLessons > 0 ? "green" : "";

		const lektorProfitColor = "green";
		const lektorNeedsToGetPaidColor =
			lektorNeedsToGetPaid < 0
				? "red"
				: lektorNeedsToGetPaid > 0
				? "green"
				: "";
		const lektorGotPaidAmountColor = "green";

		//const clientCostColor = "";
		const clientPaidAmountColor = "";
		const clientNeedsToPayColor =
			clientNeedsToPay < 0 ? "green" : clientNeedsToPay > 0 ? "red" : "";

		const mentorProfitColor = "green";

		const lektorBilanceColor =
			lektorNeedsToGetPaid < 0
				? "green"
				: lektorNeedsToGetPaid > 0
				? "red"
				: "";
		const clientBilanceColor =
			clientNeedsToPay < 0 ? "red" : clientNeedsToPay > 0 ? "green" : "";

		if (role === ROLES.Lektor) {
			content = (
				<div>
					<h3>{tutoring.name}</h3>
					<table className="table table--salaries">
						<thead className="table_header">
							<tr>
								<th
									scope="col"
									className="table__th finance--lektor__lessons">
									Odučené hodiny
								</th>
								<th
									scope="col"
									className="table__th finance--lektor__sum-money-earned">
									Celkem vyděláno
								</th>
								<th
									scope="col"
									className="table__th finance--lektor__money-got">
									Vyplaceno
								</th>
								<th
									scope="col"
									className="table__th finance--lektor__bilance">
									Zbývá k vyplacení
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="table__row finance--lektor">
								<td
									className={`table__cell ${tutoringHoursColor}`}>
									{tutoringHours}
								</td>
								<td
									className={`table__cell ${lektorProfitColor}`}>
									{lektorProfit} Kč
								</td>
								<td
									className={`table__cell ${lektorGotPaidAmountColor}`}>
									{lektorGotPaidAmount} Kč
								</td>
								<td
									className={`table__cell ${lektorNeedsToGetPaidColor}`}>
									{lektorNeedsToGetPaid} Kč
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		} else if (role === ROLES.Client) {
			content = (
				<div>
					<h3>{tutoring.name}</h3>
					<table className="table table--salaries">
						<thead className="table_header">
							<tr>
								<th
									scope="col"
									className="table__th finance--client__lessons">
									Předplacené hodiny
								</th>
								<th
									scope="col"
									className="table__th finance--client__money-paid">
									Zaplaceno
								</th>
								<th
									scope="col"
									className="table__th finance--client__bilance">
									Zbývá k zaplacení
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="table__row finance--client">
								<td
									className={`table__cell ${prepaidLessonsColor}`}>
									{prepaidLessons}
								</td>
								<td
									className={`table__cell ${clientPaidAmountColor}`}>
									{clientPaidAmount} Kč
								</td>
								<td
									className={`table__cell ${clientNeedsToPayColor}`}>
									{clientNeedsToPay} Kč
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		} else if (role === ROLES.Mentor || role === ROLES.Admin) {
			content = (
				<div>
					<h3>{tutoring.name}</h3>
					<h5>Mentor</h5>
					<table className="table table--finances">
						<thead className="table_header">
							<tr>
								<th
									scope="col"
									className="table__th finance--mentor__tutoring-lessons">
									Odučené hodiny
								</th>
								<th
									scope="col"
									className="table__th finance--mentor__client-prepaid-lessons">
									Předplacené hodiny
								</th>
								<th
									scope="col"
									className="table__th finance--mentor__lektor-bilance">
									Zbývá k vyplacení lektorovi
								</th>
								<th
									scope="col"
									className="table__th finance--mentor__client-bilance">
									Zbývá k zaplacení od klienta
								</th>
								<th
									scope="col"
									className="table__th finance--mentor__bilance">
									Výdělek mentora
								</th>
							</tr>
						</thead>
						<tbody>
							<tr className="table__row finance--mentor">
								<td
									className={`table__cell ${tutoringHoursColor}`}>
									{tutoringHours}
								</td>
								<td
									className={`table__cell ${prepaidLessonsColor}`}>
									{prepaidLessons}
								</td>
								<td
									className={`table__cell ${lektorNeedsToGetPaidColor}`}>
									{lektorNeedsToGetPaid} Kč
								</td>
								<td
									className={`table__cell ${clientNeedsToPayColor}`}>
									{clientNeedsToPay} Kč
								</td>
								<td
									className={`table__cell ${mentorProfitColor}`}>
									{mentorProfit} Kč
								</td>
							</tr>
						</tbody>
					</table>
					<details>
						<summary>Lektor</summary>
						<table className="table table--finances">
							<thead className="table_header">
								<tr>
									<th
										scope="col"
										className="table__th finance--lektor__lessons">
										Odučené hodiny
									</th>
									<th
										scope="col"
										className="table__th finance--lektor__sum-money-earned">
										Celkem vyděláno
									</th>
									<th
										scope="col"
										className="table__th finance--lektor__money-got">
										Vyplaceno
									</th>
									<th
										scope="col"
										className="table__th finance--lektor__bilance">
										Zbývá k vyplacení
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="table__row finance--lektor">
									<td
										className={`table__cell ${tutoringHoursColor}`}>
										{tutoringHours}
									</td>
									<td
										className={`table__cell ${lektorProfitColor}`}>
										{lektorProfit} Kč
									</td>
									<td
										className={`table__cell ${lektorGotPaidAmountColor}`}>
										{lektorGotPaidAmount} Kč
									</td>
									<td
										className={`table__cell ${lektorNeedsToGetPaidColor}`}>
										{lektorNeedsToGetPaid} Kč
									</td>
								</tr>
							</tbody>
						</table>
					</details>
					<details>
						<summary>Klient</summary>
						<table className="table table--finances">
							<thead className="table_header">
								<tr>
									<th
										scope="col"
										className="table__th finance--client__lessons">
										Předplacené hodiny
									</th>
									<th
										scope="col"
										className="table__th finance--client__money-paid">
										Zaplaceno
									</th>
									<th
										scope="col"
										className="table__th finance--client__bilance">
										Zbývá k zaplacení
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="table__row finance--client">
									<td
										className={`table__cell ${prepaidLessonsColor}`}>
										{prepaidLessons}
									</td>
									<td
										className={`table__cell ${clientPaidAmountColor}`}>
										{clientPaidAmount} Kč
									</td>
									<td
										className={`table__cell ${clientNeedsToPayColor}`}>
										{clientNeedsToPay} Kč
									</td>
								</tr>
							</tbody>
						</table>
					</details>
				</div>
			);
		} else if (role === "tutoring") {
			content = (
				<>
					<td className={`table__cell ${tutoringHoursColor}`}>
						{tutoringHours}
					</td>
					<td className={`table__cell ${prepaidLessonsColor}`}>
						{prepaidLessons}
					</td>
					<td className={`table__cell ${lektorBilanceColor}`}>
						{lektorNeedsToGetPaid} Kč
					</td>
					<td className={`table__cell ${clientBilanceColor}`}>
						{-clientNeedsToPay} Kč
					</td>
				</>
			);
		}
	} else if (lektor && role === "lektor_list") {
		let sortedTutorings: Array<any> = [];
		for (let i = 0; i < tutorings.length; i++) {
			if (tutorings[i].lektor === lektor.id) {
				sortedTutorings.push(tutorings[i].id);
			}
		}
		let sortedLessons: Array<any> = [];
		for (let i = 0; i < lessons.length; i++) {
			if (sortedTutorings.includes(lessons[i].tutoring)) {
				sortedLessons.push(lessons[i]);
			}
		}
		let sortedSalaries: Array<any> = [];
		for (let i = 0; i < salaries.length; i++) {
			if (salaries[i].lektor === lektor.id) {
				sortedSalaries.push(salaries[i]);
			}
		}

		//Tutorings
		const tutoringsUnderControll = sortedTutorings.length;

		// Finished lessons
		let lessonLengthSum: number = 0;
		for (let i = 0; i < sortedLessons.length; i++) {
			lessonLengthSum += sortedLessons[i].length;
		}
		const tutoringHours = parseFloat((lessonLengthSum / 60).toFixed(5));
		const lektorProfit = parseFloat(
			((lessonLengthSum / 60) * salaryPerHour).toFixed(5)
		);

		//Salaries
		let salariesAmoutSum: number = 0;
		for (let i = 0; i < sortedSalaries.length; i++) {
			salariesAmoutSum += Number(sortedSalaries[i].value);
		}
		const lektorGotPaidAmount = salariesAmoutSum;
		const lektorNeedsToGetPaid = lektorProfit - lektorGotPaidAmount;

		const tutoringHoursColor = "green";

		const lektorBilanceColor =
			lektorNeedsToGetPaid > 0
				? "green"
				: lektorNeedsToGetPaid < 0
				? "red"
				: "";

		content = (
			<>
				<td className={`table__cell ${tutoringHoursColor}`}>
					{tutoringHours}
				</td>
				<td className={`table__cell ${lektorBilanceColor}`}>
					{lektorNeedsToGetPaid} Kč
				</td>
				<td className={`table__cell ${lektorBilanceColor}`}>
					{tutoringsUnderControll}
				</td>
			</>
		);
	}
	return content;
};

export default FinancesComp;
