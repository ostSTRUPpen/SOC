import { store } from "../../app/store";
import { tutoringsApiSlice } from "../Tables/Tutorings/tutoringsApiSlice";
import { lessonsApiSlice } from "../Tables/Lessons/lessonsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { lektorsApiSlice } from "../Tables/Lektors/lektorsApiSlice";
import { mentorsApiSlice } from "../Tables/Mentors/mentorsApiSlice";
import { clientsApiSlice } from "../Tables/Klients/clientsApiSlice";

const Prefetch = () => {
	useEffect(() => {
		console.log("subscribing");
		const lessons = store.dispatch(
			lessonsApiSlice.endpoints.getLessons.initiate("")
		);
		const tutorings = store.dispatch(
			tutoringsApiSlice.endpoints.getTutorings.initiate("")
		);
		const lektors = store.dispatch(
			lektorsApiSlice.endpoints.getLektors.initiate("")
		);
		const mentors = store.dispatch(
			mentorsApiSlice.endpoints.getMentors.initiate("")
		);
		const clients = store.dispatch(
			clientsApiSlice.endpoints.getClients.initiate("")
		);
		return () => {
			console.log("unsubscribing");
			lessons.unsubscribe();
			tutorings.unsubscribe();
			lektors.unsubscribe();
			mentors.unsubscribe();
			clients.unsubscribe();
		};
	}, []);

	return <Outlet />;
};

export default Prefetch;
