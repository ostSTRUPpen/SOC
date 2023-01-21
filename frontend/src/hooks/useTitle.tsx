import { useEffect } from "react";

const useTitle = (title: string) => {
	useEffect((): any => {
		const prevTitle = document.title;
		document.title = title;

		return () => (document.title = prevTitle);
	}, [title]);
};

export default useTitle;
