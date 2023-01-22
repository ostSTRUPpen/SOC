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
}: any) => {
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

	let content: JSX.Element = <div></div>;
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
							<td className="table__cell">{tutoringHours}</td>
							<td className="table__cell">{lektorProfit} Kč</td>
							<td className="table__cell">
								{lektorGotPaidAmount} Kč
							</td>
							<td className="table__cell">
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
							<td className="table__cell">{prepaidLessons}</td>
							<td className="table__cell">
								{clientPaidAmount} Kč
							</td>
							<td className="table__cell">
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
							<td className="table__cell">{tutoringHours}</td>
							<td className="table__cell">{prepaidLessons}</td>
							<td className="table__cell">
								{lektorNeedsToGetPaid} Kč
							</td>
							<td className="table__cell">
								{clientNeedsToPay} Kč
							</td>
							<td className="table__cell">{mentorProfit} Kč</td>
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
								<td className="table__cell">{tutoringHours}</td>
								<td className="table__cell">
									{lektorProfit} Kč
								</td>
								<td className="table__cell">
									{lektorGotPaidAmount} Kč
								</td>
								<td className="table__cell">
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
								<td className="table__cell">
									{prepaidLessons}
								</td>
								<td className="table__cell">
									{clientPaidAmount} Kč
								</td>
								<td className="table__cell">
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
				<td className="table__cell">{tutoringHours} Kč</td>
				<td className="table__cell">{prepaidLessons} Kč</td>
				<td className="table__cell">{-lektorNeedsToGetPaid} Kč</td>
				<td className="table__cell">{-clientNeedsToPay} Kč</td>
			</>
		);
	}
	return content;
};

export default FinancesComp;
