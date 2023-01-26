import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const tutoringsAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = tutoringsAdapter.getInitialState();

export const tutoringsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getTutorings: builder.query({
			query: () => ({
				url: "/tutorings",
				validateStatus: (response: any, result: any) => {
					return response.status === 200 && !result.isError;
				},
			}),
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
		addNewTutoring: builder.mutation({
			query: (initialTutoring) => ({
				url: "/tutorings",
				method: "POST",
				body: {
					...initialTutoring,
				},
			}),
			invalidatesTags: [{ type: "Tutoring", id: "LIST" }],
		}),
		updateTutoring: builder.mutation({
			query: (initialTutoring) => ({
				url: "/tutorings",
				method: "PATCH",
				body: {
					...initialTutoring,
				},
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Tutoring", id: arg.id },
			],
		}),
		deleteTutoring: builder.mutation({
			query: ({ id }) => ({
				url: `/tutorings`,
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Tutoring", id: arg.id },
			],
		}),
	}),
});

export const {
	useGetTutoringsQuery,
	useAddNewTutoringMutation,
	useDeleteTutoringMutation,
	useUpdateTutoringMutation,
} = tutoringsApiSlice;

export const selectTutoringsResult =
	tutoringsApiSlice.endpoints.getTutorings.select("");

const selectTutoringsData = createSelector(
	selectTutoringsResult,
	(tutoringsResult) => tutoringsResult.data
);

export const {
	selectAll: selectAllTutorings,
	selectById: selectTutoringById,
	selectIds: selectTutoringIds,
} = tutoringsAdapter.getSelectors(
	(state: any) => selectTutoringsData(state) ?? initialState
);
