import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";
// TOHLE CELÉ SE MUSÍ PŘEPSAT - NEPLNÍ TO FUNKCI
/*
Potřebuji pouze lessons pro příslošné ID lektora/klienta
https://redux-toolkit.js.org/rtk-query/usage-with-typescript
*/
const lessonsAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = lessonsAdapter.getInitialState();
// https://redux-toolkit.js.org/rtk-query/usage-with-typescript (provideTags hází nevysvětlitelný error)
export const lessonsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getLessons: builder.query({
			query: () => "/lessons",
			/*validateStatus: (response: any, result: any) => {
				return response.status === 200 && !result.isError;
			},*/
			// 5 sekund - smazat až půjde do production (PROD)
			//keepUnusedDataFor: 5,
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

// returns the query result object
export const selectLessonsResult =
	lessonsApiSlice.endpoints.getLessons.select("");

// creates memoized selector
const selectLessonsData = createSelector(
	selectLessonsResult,
	(lessonsResult) => lessonsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllLessons,
	selectById: selectLessonById,
	selectIds: selectLessonIds,
	// Pass in a selector that returns the lessons slice of state
} = lessonsAdapter.getSelectors(
	(state: any) => selectLessonsData(state) ?? initialState
);
