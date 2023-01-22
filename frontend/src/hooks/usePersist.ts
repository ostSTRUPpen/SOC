import { useState, useEffect } from "react";
import { saveToLocalStorage, readFromLocalStorage } from "./useLocalStorage";

const usePersist = () => {
	const [persist, setPersist] = useState(
		readFromLocalStorage("persist") === "Not found"
			? JSON.parse("false")
			: JSON.parse(readFromLocalStorage("persist"))
	);

	useEffect(() => {
		saveToLocalStorage("persist", JSON.stringify(persist));
	}, [persist]);

	return [persist, setPersist];
};
export default usePersist;
