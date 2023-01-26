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
	if (!role) {
		return <></>;
	}
	let content: JSX.Element = <div></div>;
	if (tutoring && role !== "lektor_list") {
		if (
			!tutoring ||
			!lessons ||
			!invoices ||
			!salaries ||
			!role ||
			!salaryPerHour ||
			!pricePerHour
		) {
			return <></>;
		}
		const mentorPerHour = pricePerHour - salaryPerHour;

		const sortedLessons = lessons.filter(
			(lesson: any) => lesson.tutoring === tutoring.id
		);
		const sortedInvoices = invoices.filter(
			(invoice: any) => invoice.tutoring === tutoring.id
		);
		const sortedSalaries = salaries.filter(
			(salary: any) => salary.tutoring === tutoring.id
		);

		// Finished lessons
		let lessonLengthSum: number = 0;
		sortedLessons.forEach(
			(lesson: any) => (lessonLengthSum += lesson.length)
		);
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

		// Salaries
		let salariesAmoutSum: number = 0;
		sortedSalaries.forEach(
			(salary: any) => (salariesAmoutSum += salary.value)
		);

		const lektorGotPaidAmount = salariesAmoutSum;
		const lektorNeedsToGetPaid = lektorProfit - lektorGotPaidAmount;

		// Invoices
		let invoicesAmoutSum: number = 0;
		sortedInvoices.forEach(
			(invoice: any) => (invoicesAmoutSum += invoice.value)
		);

		const clientPaidAmount = invoicesAmoutSum;
		const clientNeedsToPay = clientCost - clientPaidAmount;

		// Prepaid lessons
		const prepaidLessons = parseFloat(
			(clientPaidAmount / pricePerHour - tutoringHours).toFixed(5)
		);

		// Color filling
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

		// const clientCostColor = "";
		const clientPaidAmountColor = "";
		const clientNeedsToPayColor =
			clientNeedsToPay < 0 ? "green" : clientNeedsToPay > 0 ? "red" : "";

		const mentorProfitColor = "green";

		const lektorBilanceColor =
			lektorNeedsToGetPaid > 500
				? "red"
				: lektorNeedsToGetPaid < 500
				? "green"
				: "";
		const clientBilanceColor =
			clientNeedsToPay > 0
				? "red"
				: clientNeedsToPay < 0
				? "green"
				: clientNeedsToPay === 0
				? "orange"
				: "";

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
		if (!tutorings || !lessons || !salaries || !salaryPerHour || !lektor) {
			return <></>;
		}

		let sortedTutorings: Array<any> = [];
		tutorings.forEach((tutoring: any) =>
			tutoring.lektor === lektor.id
				? sortedTutorings.push(tutoring.id)
				: ""
		);
		const sortedLessons = lessons.filter((lesson: any) =>
			sortedTutorings.includes(lesson.tutoring)
		);
		const sortedSalaries = salaries.filter(
			(salary: any) => salary.lektor === lektor.id
		);

		// Tutorings
		const tutoringsUnderControll = sortedTutorings.length;

		// Finished lessons
		let lessonLengthSum: number = 0;
		sortedLessons.forEach(
			(lesson: any) => (lessonLengthSum += lesson.length)
		);

		const tutoringHours = parseFloat((lessonLengthSum / 60).toFixed(5));
		const lektorProfit = parseFloat(
			((lessonLengthSum / 60) * salaryPerHour).toFixed(5)
		);

		// Salaries
		let salariesAmoutSum: number = 0;
		sortedSalaries.forEach(
			(salary: any) => (salariesAmoutSum += salary.value)
		);

		const lektorGotPaidAmount = salariesAmoutSum;
		const lektorNeedsToGetPaid = lektorProfit - lektorGotPaidAmount;

		const tutoringHoursColor = "green";

		const lektorBilanceColor =
			lektorNeedsToGetPaid > 500
				? "red"
				: lektorNeedsToGetPaid < 500
				? "green"
				: "";

		content = (
			<>
				<td className={`table__cell ${tutoringHoursColor}`}>
					{tutoringHours}
				</td>
				<td className={`table__cell ${lektorBilanceColor}`}>
					{-lektorNeedsToGetPaid} Kč
				</td>
				<td className={`table__cell`}>{tutoringsUnderControll}</td>
			</>
		);
	}
	return content;
};

export default FinancesComp;
