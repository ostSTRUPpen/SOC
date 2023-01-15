import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";
// TOHLE CELÉ SE MUSÍ PŘEPSAT - NEPLNÍ TO FUNKCI
/*
Potřebuji pouze clients pro příslošné ID clienta/klienta
https://redux-toolkit.js.org/rtk-query/usage-with-typescript
*/
const clientsAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = clientsAdapter.getInitialState();
// https://redux-toolkit.js.org/rtk-query/usage-with-typescript (provideTags hází nevysvětlitelný error)
export const clientsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getClients: builder.query({
			query: () => "/clients",
			/*validateStatus: (response: any, result: any) => {
				return response.status === 200 && !result.isError;
			},*/
			// 5 sekund - smazat až půjde do production (PROD)
			//keepUnusedDataFor: 5,
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

// returns the query result object
export const selectClientsResult =
	clientsApiSlice.endpoints.getClients.select("");

// creates memoized selector
const selectClientsData = createSelector(
	selectClientsResult,
	(clientsResult) => clientsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllClients,
	selectById: selectClientById,
	selectIds: selectClientIds,
	// Pass in a selector that returns the clients slice of state
} = clientsAdapter.getSelectors(
	(state: any) => selectClientsData(state) ?? initialState
);
