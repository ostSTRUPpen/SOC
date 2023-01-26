import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const mentorsAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = mentorsAdapter.getInitialState();

export const mentorsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getMentors: builder.query({
			query: () => ({
				url: "/mentors",
				validateStatus: (response: any, result: any) => {
					return response.status === 200 && !result.isError;
				},
			}),
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

export const selectMentorsResult =
	mentorsApiSlice.endpoints.getMentors.select("");

const selectMentorsData = createSelector(
	selectMentorsResult,
	(mentorsResult) => mentorsResult.data
);

export const {
	selectAll: selectAllMentors,
	selectById: selectMentorById,
	selectIds: selectMentorIds,
} = mentorsAdapter.getSelectors(
	(state: any) => selectMentorsData(state) ?? initialState
);
