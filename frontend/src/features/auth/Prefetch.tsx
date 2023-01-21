import { store } from "../../app/store";
import { tutoringsApiSlice } from "../Tables/Tutorings/tutoringsApiSlice";
import { lessonsApiSlice } from "../Tables/Lessons/lessonsApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { lektorsApiSlice } from "../Tables/Lektors/lektorsApiSlice";
import { mentorsApiSlice } from "../Tables/Mentors/mentorsApiSlice";
import { clientsApiSlice } from "../Tables/Klients/clientsApiSlice";
import { invoicesApiSlice } from "../Tables/Invoices/invoicesApiSlice";
import { salariesApiSlice } from "../Tables/Salaries/salariesApiSlice";

const Prefetch = () => {
	useEffect(() => {
		store.dispatch(
			lessonsApiSlice.util.prefetch("getLessons", "lessonsList", {
				force: true,
			})
		);
		store.dispatch(
			tutoringsApiSlice.util.prefetch("getTutorings", "tutoringsList", {
				force: true,
			})
		);
		store.dispatch(
			lektorsApiSlice.util.prefetch("getLektors", "lektorsList", {
				force: true,
			})
		);
		store.dispatch(
			mentorsApiSlice.util.prefetch("getMentors", "mentorsList", {
				force: true,
			})
		);
		store.dispatch(
			clientsApiSlice.util.prefetch("getClients", "clientsList", {
				force: true,
			})
		);
		store.dispatch(
			invoicesApiSlice.util.prefetch("getInvoices", "invoicesList", {
				force: true,
			})
		);
		store.dispatch(
			salariesApiSlice.util.prefetch("getSalaries", "salariesList", {
				force: true,
			})
		);
	}, []);

	return <Outlet />;
};

export default Prefetch;
