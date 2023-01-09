import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";
// TOHLE CELÉ SE MUSÍ PŘEPSAT - NEPLNÍ TO FUNKCI
/*
Potřebuji pouze mentors pro příslošné ID lektora/klienta
https://redux-toolkit.js.org/rtk-query/usage-with-typescript
*/
const mentorsAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = mentorsAdapter.getInitialState();
// https://redux-toolkit.js.org/rtk-query/usage-with-typescript (provideTags hází nevysvětlitelný error)
export const mentorsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMentors: builder.query({
			query: () => "/mentors",
			/*validateStatus: (response: any, result: any) => {
				return response.status === 200 && !result.isError;
			},*/
			// 5 sekund - smazat až půjde do production (PROD)
			//keepUnusedDataFor: 5,
			transformResponse: (responseData: any) => {
				const loadedMentors = responseData.map((mentor: any) => {
					mentor.id = mentor._id;
					return mentor;
				});
				return mentorsAdapter.setAll(initialState, loadedMentors);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						...result.ids.map((id) => ({
							type: "Mentor" as const,
							id,
						})),
						{ type: "Mentor", id: "LIST" },
					];
				} else return [{ type: "Mentor", id: "LIST" }];
			},
		}),
		addNewMentor: builder.mutation({
			query: (initialMentor) => ({
				url: "/mentors",
				method: "POST",
				body: {
					...initialMentor,
				},
			}),
			invalidatesTags: [{ type: "Mentor", id: "LIST" }],
		}),
		updateMentor: builder.mutation({
			query: (initialMentor) => ({
				url: "/mentors",
				method: "PATCH",
				body: {
					...initialMentor,
				},
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Mentor", id: arg.id },
			],
		}),
		deleteMentor: builder.mutation({
			query: ({ id }) => ({
				url: `/mentors`,
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Mentor", id: arg.id },
			],
		}),
	}),
});

export const {
	useGetMentorsQuery,
	useAddNewMentorMutation,
	useDeleteMentorMutation,
	useUpdateMentorMutation,
} = mentorsApiSlice;

// returns the query result object
export const selectMentorsResult =
	mentorsApiSlice.endpoints.getMentors.select("");

// creates memoized selector
const selectMentorsData = createSelector(
	selectMentorsResult,
	(mentorsResult) => mentorsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllMentors,
	selectById: selectMentorById,
	selectIds: selectMentorIds,
	// Pass in a selector that returns the mentors slice of state
} = mentorsAdapter.getSelectors(
	(state: any) => selectMentorsData(state) ?? initialState
);
