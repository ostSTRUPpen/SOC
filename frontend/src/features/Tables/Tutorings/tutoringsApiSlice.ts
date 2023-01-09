import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";
// TOHLE CELÉ SE MUSÍ PŘEPSAT - NEPLNÍ TO FUNKCI
/*
Potřebuji pouze tutorings pro příslošné ID lektora/klienta
https://redux-toolkit.js.org/rtk-query/usage-with-typescript
*/
const tutoringsAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = tutoringsAdapter.getInitialState();
// https://redux-toolkit.js.org/rtk-query/usage-with-typescript (provideTags hází nevysvětlitelný error)
export const tutoringsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTutorings: builder.query({
			query: () => "/tutorings",
			/*validateStatus: (response: any, result: any) => {
				return response.status === 200 && !result.isError;
			},*/
			// 5 sekund - smazat až půjde do production (PROD)
			//keepUnusedDataFor: 5,
			transformResponse: (responseData: any) => {
				const loadedTutorings = responseData.map((tutoring: any) => {
					tutoring.id = tutoring._id;
					return tutoring;
				});
				return tutoringsAdapter.setAll(initialState, loadedTutorings);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						...result.ids.map((id) => ({
							type: "Tutoring" as const,
							id,
						})),
						{ type: "Tutoring", id: "LIST" },
					];
				} else return [{ type: "Tutoring", id: "LIST" }];
			},
		}),
	}),
});

export const { useGetTutoringsQuery } = tutoringsApiSlice;

// returns the query result object
export const selectTutoringsResult =
	tutoringsApiSlice.endpoints.getTutorings.select("");

// creates memoized selector
const selectTutoringsData = createSelector(
	selectTutoringsResult,
	(tutoringsResult) => tutoringsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllTutorings,
	selectById: selectTutoringById,
	selectIds: selectTutoringIds,
	// Pass in a selector that returns the tutorings slice of state
} = tutoringsAdapter.getSelectors(
	(state: any) => selectTutoringsData(state) ?? initialState
);