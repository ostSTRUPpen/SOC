import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const clientsAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = clientsAdapter.getInitialState();
export const clientsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getClients: builder.query({
			query: () => ({
				url: "/clients",
				validateStatus: (response: any, result: any) => {
					return response.status === 200 && !result.isError;
				},
			}),
			transformResponse: (responseData: any) => {
				const loadedClients = responseData.map((client: any) => {
					client.id = client._id;
					return client;
				});
				return clientsAdapter.setAll(initialState, loadedClients);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						...result.ids.map((id) => ({
							type: "Client" as const,
							id,
						})),
						{ type: "Client", id: "LIST" },
					];
				} else return [{ type: "Client", id: "LIST" }];
			},
		}),
		addNewClient: builder.mutation({
			query: (initialClient) => ({
				url: "/clients",
				method: "POST",
				body: {
					...initialClient,
				},
			}),
			invalidatesTags: [{ type: "Client", id: "LIST" }],
		}),
		updateClient: builder.mutation({
			query: (initialClient) => ({
				url: "/clients",
				method: "PATCH",
				body: {
					...initialClient,
				},
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Client", id: arg.id },
			],
		}),
		deleteClient: builder.mutation({
			query: ({ id }) => ({
				url: `/clients`,
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Client", id: arg.id },
			],
		}),
	}),
});

export const {
	useGetClientsQuery,
	useAddNewClientMutation,
	useDeleteClientMutation,
	useUpdateClientMutation,
} = clientsApiSlice;

export const selectClientsResult =
	clientsApiSlice.endpoints.getClients.select("");

const selectClientsData = createSelector(
	selectClientsResult,
	(clientsResult) => clientsResult.data
);

export const {
	selectAll: selectAllClients,
	selectById: selectClientById,
	selectIds: selectClientIds,
} = clientsAdapter.getSelectors(
	(state: any) => selectClientsData(state) ?? initialState
);
