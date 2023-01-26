import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const salariesAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = salariesAdapter.getInitialState();

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

export const selectSalariesResult =
	salariesApiSlice.endpoints.getSalaries.select("");

const selectSalariesData = createSelector(
	selectSalariesResult,
	(salariesResult) => salariesResult.data
);

export const {
	selectAll: selectAllSalaries,
	selectById: selectSalaryById,
	selectIds: selectSalaryIds,
} = salariesAdapter.getSelectors(
	(state: any) => selectSalariesData(state) ?? initialState
);
