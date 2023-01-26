import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const lessonsAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = lessonsAdapter.getInitialState();

export const lessonsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getLessons: builder.query({
			query: () => ({
				url: "/lessons",
				validateStatus: (response: any, result: any) => {
					return response.status === 200 && !result.isError;
				},
			}),
			transformResponse: (responseData: any) => {
				const loadedLessons = responseData.map((lesson: any) => {
					lesson.id = lesson._id;
					return lesson;
				});
				return lessonsAdapter.setAll(initialState, loadedLessons);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						...result.ids.map((id) => ({
							type: "Lesson" as const,
							id,
						})),
						{ type: "Lesson", id: "LIST" },
					];
				} else return [{ type: "Lesson", id: "LIST" }];
			},
		}),
		addNewLesson: builder.mutation({
			query: (initialLesson) => ({
				url: "/lessons",
				method: "POST",
				body: {
					...initialLesson,
				},
			}),
			invalidatesTags: [{ type: "Lesson", id: "LIST" }],
		}),
		updateLesson: builder.mutation({
			query: (initialLesson) => ({
				url: "/lessons",
				method: "PATCH",
				body: {
					...initialLesson,
				},
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Lesson", id: arg.id },
			],
		}),
		deleteLesson: builder.mutation({
			query: ({ id }) => ({
				url: `/lessons`,
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Lesson", id: arg.id },
			],
		}),
	}),
});

export const {
	useGetLessonsQuery,
	useAddNewLessonMutation,
	useDeleteLessonMutation,
	useUpdateLessonMutation,
} = lessonsApiSlice;

export const selectLessonsResult =
	lessonsApiSlice.endpoints.getLessons.select("");

const selectLessonsData = createSelector(
	selectLessonsResult,
	(lessonsResult) => lessonsResult.data
);

export const {
	selectAll: selectAllLessons,
	selectById: selectLessonById,
	selectIds: selectLessonIds,
} = lessonsAdapter.getSelectors(
	(state: any) => selectLessonsData(state) ?? initialState
);
