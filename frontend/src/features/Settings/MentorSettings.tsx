import {
	saveToLocalStorage,
	readFromLocalStorage,
} from "../../hooks/useLocalStorage";
import { useState } from "react";

const VALUE_REGEX = /^[0-9]{2,5}$/;

const MentorSetings = () => {
	/*const [darkMode, setDarkMode] = useState(readFromLocalStorage("darkMode"));*/
	const [standartSalaryValue, setStandartSalaryValue] = useState(
		readFromLocalStorage("standartSalaryValue")
	);
	const [standartInvoiceValue, setStandartInvoiceValue] = useState(
		readFromLocalStorage("standartInvoiceValue")
	);
	const [prefilSalaryDate, setPrefillSalaryDate] = useState(
		readFromLocalStorage("prefillSalaryDate")
	);
	const [prefilInvoiceDate, setPrefillInvoiceDate] = useState(
		readFromLocalStorage("prefillInvoiceDate")
	);

	// Dark mode logic
	/*if (darkMode === "Not found") {
		setDarkMode(false);
		saveToLocalStorage("darkMode", false);
	}*/

	/*const onDarkModeChanged = () => {
		setDarkMode(!darkMode);
		saveToLocalStorage("darkMode", !darkMode);
	}; */

	// Standart salary logic
	if (standartSalaryValue === "Not found") {
		setStandartSalaryValue(0);
		saveToLocalStorage("standartSalaryValue", standartSalaryValue);
	}

	const onStandartSalaryValueChanged = (e: any) => {
		const salary: number = Number(e.target.value);
		if (VALUE_REGEX.test(String(salary)) && salary <= 99999) {
			setStandartSalaryValue(salary);
			saveToLocalStorage("standartSalaryValue", salary);
		}
	};

	// Standart Invoice logic
	if (standartInvoiceValue === "Not found") {
		setStandartInvoiceValue(0);
		saveToLocalStorage("standartInvoiceValue", standartInvoiceValue);
	}

	const onStandartInvoiceValueChanged = (e: any) => {
		const invoice: number = Number(e.target.value);
		if (VALUE_REGEX.test(String(invoice)) && invoice <= 99999) {
			setStandartInvoiceValue(invoice);
			saveToLocalStorage("standartInvoiceValue", invoice);
		}
	};

	//Prefil salary date logic
	if (prefilSalaryDate === "Not found") {
		setPrefillSalaryDate(false);
		saveToLocalStorage("prefillSalaryDate", false);
	}

	const onPrefillSalaryDateChanged = () => {
		setPrefillSalaryDate(!prefilSalaryDate);
		saveToLocalStorage("prefillSalaryDate", !prefilSalaryDate);
	};

	//Prefill invoice date logic
	if (prefilInvoiceDate === "Not found") {
		setPrefillInvoiceDate(false);
		saveToLocalStorage("prefillInvoiceDate", false);
	}

	const onPrefillInvoiceDateChanged = () => {
		setPrefillInvoiceDate(!prefilInvoiceDate);
		saveToLocalStorage("prefillInvoiceDate", !prefilInvoiceDate);
	};

	return (
		<details>
			<summary>Nastavení aplikace</summary>
			{/*<label htmlFor="dark-mode">Tmavý režim: </label>
			<input
				className="app_settings dark-mode"
				id="dark-mode"
				name="dark-mode"
				type="checkbox"
				checked={darkMode}
				onChange={onDarkModeChanged}></input>
			<br />*/}
			<h2>Faktury: </h2>
			<label htmlFor="prefil-invoice-date">
				Při zápisu faktury předvyplnit dnešní datum:
			</label>
			<input
				className="app_settings prefil-invoice-date"
				id="prefil-invoice-date"
				name="prefil-invoice-date"
				type="checkbox"
				checked={prefilInvoiceDate}
				onChange={onPrefillInvoiceDateChanged}></input>
			<br />
			<label htmlFor="invoice-prefill">Standartní částka faktury: </label>
			<input
				className="app_settings invoice-prefill"
				id="invoice-prefill"
				name="invoice-prefill"
				type="number"
				max={99999}
				value={standartInvoiceValue}
				onChange={onStandartInvoiceValueChanged}></input>
			<br />
			<h2>Výplaty: </h2>
			<br />
			<label htmlFor="prefil-salary-date">
				Při zápisu výplaty předvyplnit dnešní datum:
			</label>
			<input
				className="app_settings prefil-salary-date"
				id="prefil-salary-date"
				name="prefil-salary-date"
				type="checkbox"
				checked={prefilSalaryDate}
				onChange={onPrefillSalaryDateChanged}></input>
			<br />
			<label htmlFor="salary-prefill">Standartní částka výplaty: </label>
			<input
				className="app_settings salary-prefill"
				id="salary-prefill"
				name="salary-prefill"
				type="number"
				max={99999}
				value={standartSalaryValue}
				onChange={onStandartSalaryValueChanged}></input>
		</details>
	);
};

export default MentorSetings;
