import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";
// TOHLE CELÉ SE MUSÍ PŘEPSAT - NEPLNÍ TO FUNKCI
/*
Potřebuji pouze salaries pro příslošné ID lektora/klienta
https://redux-toolkit.js.org/rtk-query/usage-with-typescript
*/
const salariesAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = salariesAdapter.getInitialState();
// https://redux-toolkit.js.org/rtk-query/usage-with-typescript (provideTags hází nevysvětlitelný error)
export const salariesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSalaries: builder.query({
			query: () => ({
				url: "/salaries",
				validateStatus: (response: any, result: any) => {
					return response.status === 200 && !result.isError;
				},
			}),
			transformResponse: (responseData: any) => {
				const loadedSalaries = responseData.map((salary: any) => {
					salary.id = salary._id;
					return salary;
				});
				return salariesAdapter.setAll(initialState, loadedSalaries);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						...result.ids.map((id) => ({
							type: "Salary" as const,
							id,
						})),
						{ type: "Salary", id: "LIST" },
					];
				} else return [{ type: "Salary", id: "LIST" }];
			},
		}),
		addNewSalary: builder.mutation({
			query: (initialSalary) => ({
				url: "/salaries",
				method: "POST",
				body: {
					...initialSalary,
				},
			}),
			invalidatesTags: [{ type: "Salary", id: "LIST" }],
		}),
		updateSalary: builder.mutation({
			query: (initialSalary) => ({
				url: "/salaries",
				method: "PATCH",
				body: {
					...initialSalary,
				},
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Salary", id: arg.id },
			],
		}),
		deleteSalary: builder.mutation({
			query: ({ id }) => ({
				url: `/salaries`,
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Salary", id: arg.id },
			],
		}),
	}),
});

export const {
	useGetSalariesQuery,
	useAddNewSalaryMutation,
	useDeleteSalaryMutation,
	useUpdateSalaryMutation,
} = salariesApiSlice;

// returns the query result object
export const selectSalariesResult =
	salariesApiSlice.endpoints.getSalaries.select("");

// creates memoized selector
const selectSalariesData = createSelector(
	selectSalariesResult,
	(salariesResult) => salariesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllSalaries,
	selectById: selectSalaryById,
	selectIds: selectSalaryIds,
	// Pass in a selector that returns the salaries slice of state
} = salariesAdapter.getSelectors(
	(state: any) => selectSalariesData(state) ?? initialState
);
