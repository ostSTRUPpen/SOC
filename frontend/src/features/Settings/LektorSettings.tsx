import {
	saveToLocalStorage,
	readFromLocalStorage,
} from "../../hooks/useLocalStorage";
import { useState } from "react";

const LENGTH_REGEX = /^[0-9]{1,3}$/;

const LektorSetings = () => {
	/*const [darkMode, setDarkMode] = useState(readFromLocalStorage("darkMode"));*/
	const [standartLength, setStandartLength] = useState(
		readFromLocalStorage("standartLength")
	);
	const [prefillLessonDate, setprefillLessonDate] = useState(
		readFromLocalStorage("prefillLessonDate")
	);

	// Dark mode logic
	/*if (darkMode === "Not found") {
		setDarkMode(false);
		saveToLocalStorage("darkMode", false);
	}*/

	/*const onDarkModeChanged = () => {
		setDarkMode(!darkMode);
		saveToLocalStorage("darkMode", !darkMode);
	};*/

	// Standart length logic
	if (standartLength === "Not found") {
		setStandartLength(60);
		saveToLocalStorage("standartLength", standartLength);
	}

	const onStandartLengthChanged = (e: any) => {
		const length: number = Number(e.target.value);
		if (LENGTH_REGEX.test(String(length)) && length <= 180) {
			setStandartLength(length);
			saveToLocalStorage("standartLength", length);
		}
	};

	// Prefil date logic

	if (prefillLessonDate === "Not found") {
		setprefillLessonDate(false);
		saveToLocalStorage("prefillLessonDate", false);
	}

	const onPrefilLessonDateChanged = () => {
		setprefillLessonDate(!prefillLessonDate);
		saveToLocalStorage("prefillLessonDate", !prefillLessonDate);
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
			<label htmlFor="length-prefill">Standartní délka lekce: </label>
			<input
				className="app_settings length-prefill"
				id="length-prefill"
				name="length-prefill"
				type="number"
				max={180}
				value={standartLength}
				onChange={onStandartLengthChanged}></input>
			<br />
			<label htmlFor="prefill-lesson-date">
				Při zápisu lekce předvyplnit dnešní datum:{" "}
			</label>
			<input
				className="app_settings prefill-lesson-date"
				id="prefill-lesson-date"
				name="prefill-lesson-date"
				type="checkbox"
				checked={prefillLessonDate}
				onChange={onPrefilLessonDateChanged}></input>
		</details>
	);
};

export default LektorSetings;
