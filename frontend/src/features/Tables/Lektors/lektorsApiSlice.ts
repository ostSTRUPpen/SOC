import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";
// TOHLE CELÉ SE MUSÍ PŘEPSAT - NEPLNÍ TO FUNKCI
/*
Potřebuji pouze lektors pro příslošné ID lektora/klienta
https://redux-toolkit.js.org/rtk-query/usage-with-typescript
*/
const lektorsAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = lektorsAdapter.getInitialState();
// https://redux-toolkit.js.org/rtk-query/usage-with-typescript (provideTags hází nevysvětlitelný error)
export const lektorsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getLektors: builder.query({
			query: () => ({
				url: "/lektors",
				validateStatus: (response: any, result: any) => {
					return response.status === 200 && !result.isError;
				},
			}),
			transformResponse: (responseData: any) => {
				const loadedLektors = responseData.map((lektor: any) => {
					lektor.id = lektor._id;
					return lektor;
				});
				return lektorsAdapter.setAll(initialState, loadedLektors);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						...result.ids.map((id) => ({
							type: "Lektor" as const,
							id,
						})),
						{ type: "Lektor", id: "LIST" },
					];
				} else return [{ type: "Lektor", id: "LIST" }];
			},
		}),
		addNewLektor: builder.mutation({
			query: (initialLektor) => ({
				url: "/lektors",
				method: "POST",
				body: {
					...initialLektor,
				},
			}),
			invalidatesTags: [{ type: "Lektor", id: "LIST" }],
		}),
		updateLektor: builder.mutation({
			query: (initialLektor) => ({
				url: "/lektors",
				method: "PATCH",
				body: {
					...initialLektor,
				},
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Lektor", id: arg.id },
			],
		}),
		deleteLektor: builder.mutation({
			query: ({ id }) => ({
				url: `/lektors`,
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Lektor", id: arg.id },
			],
		}),
	}),
});

export const {
	useGetLektorsQuery,
	useAddNewLektorMutation,
	useDeleteLektorMutation,
	useUpdateLektorMutation,
} = lektorsApiSlice;

// returns the query result object
export const selectLektorsResult =
	lektorsApiSlice.endpoints.getLektors.select("");

// creates memoized selector
const selectLektorsData = createSelector(
	selectLektorsResult,
	(lektorsResult) => lektorsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllLektors,
	selectById: selectLektorById,
	selectIds: selectLektorIds,
	// Pass in a selector that returns the lektors slice of state
} = lektorsAdapter.getSelectors(
	(state: any) => selectLektorsData(state) ?? initialState
);
