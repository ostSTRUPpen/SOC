import {
	saveToLocalStorage,
	readFromLocalStorage,
} from "../../hooks/localStorage";
import { useState } from "react";

const ClientSetings = () => {
	const [darkMode, setDarkMode] = useState(readFromLocalStorage("darkMode"));

	if (darkMode === "Not found") {
		setDarkMode(false);
		saveToLocalStorage("darkMode", false);
	}

	const onDarkModeChanged = () => {
		setDarkMode(!darkMode);
		saveToLocalStorage("darkMode", !darkMode);
	};

	return (
		<details>
			<summary>Nastavení aplikace</summary>
			<label htmlFor="dark-mode">Tmavý režim</label>
			<input
				className="app_settings dark-mode"
				id="dark-mode"
				name="dark-mode"
				type="checkbox"
				checked={darkMode}
				onChange={onDarkModeChanged}
			></input>
		</details>
	);
};

export default ClientSetings;
