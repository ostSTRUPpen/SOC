import { useState, useEffect } from "react";
import { saveToLocalStorage, readFromLocalStorage } from "./useLocalStorage";

const usePersist = () => {
	const [persist, setPersist] = useState(
		readFromLocalStorage("persist") === "Not found"
			? false
			: readFromLocalStorage("persist")
	);

	useEffect(() => {
		saveToLocalStorage("persist", persist);
	}, [persist]);

	return [persist, setPersist];
};
export default usePersist;
