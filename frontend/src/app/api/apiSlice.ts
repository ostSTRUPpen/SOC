import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// TOHLE CELÉ SE MOŽNÁ MUSÍ PŘEPSAT - MOŽNÁ NEPLNÍ TO FUNKCI
/*
https://redux-toolkit.js.org/rtk-query/usage-with-typescript
*/

//import { setCredentials } from "../../features/auth/authSlice";

/*const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3500",
	credentials: "include",
	prepareHeaders (headers, { getState }) => {
		const token = getState().auth
	}
});
*/

const apiSlice = createApi({
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
	tagTypes: [
		"Mentor",
		"Lektor",
		"Client",
		"Tutoring",
		"Lesson",
		"Invoice",
		"Salary",
	],
	endpoints: (builder) => ({}),
});

export { apiSlice };
