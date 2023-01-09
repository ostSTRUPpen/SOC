import { store } from "../../app/store";
import { tutoringsApiSlice } from "../Tables/Tutorings/tutoringsApiSlice";
import { lessonsApiSlice } from "../Tables/Lessons/lessonsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
	useEffect(() => {
		console.log("subscribing");
		const lessons = store.dispatch(
			lessonsApiSlice.endpoints.getLessons.initiate("")
		);
		const tutorings = store.dispatch(
			tutoringsApiSlice.endpoints.getTutorings.initiate("")
		);
		return () => {
			console.log("unsubscribing");
			lessons.unsubscribe();
			tutorings.unsubscribe();
		};
	}, []);

	return <Outlet />;
};

export default Prefetch;
