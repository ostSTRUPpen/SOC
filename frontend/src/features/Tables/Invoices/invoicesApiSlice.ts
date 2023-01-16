import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";
// TOHLE CELÉ SE MUSÍ PŘEPSAT - NEPLNÍ TO FUNKCI
/*
Potřebuji pouze invoices pro příslošné ID lektora/klienta
https://redux-toolkit.js.org/rtk-query/usage-with-typescript
*/
const invoicesAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = invoicesAdapter.getInitialState();
// https://redux-toolkit.js.org/rtk-query/usage-with-typescript (provideTags hází nevysvětlitelný error)
export const invoicesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getInvoices: builder.query({
			query: () => "/invoices",
			/*validateStatus: (response: any, result: any) => {
				return response.status === 200 && !result.isError;
			},*/
			// 5 sekund - smazat až půjde do production (PROD)
			//keepUnusedDataFor: 5,
			transformResponse: (responseData: any) => {
				const loadedInvoices = responseData.map((invoice: any) => {
					invoice.id = invoice._id;
					return invoice;
				});
				return invoicesAdapter.setAll(initialState, loadedInvoices);
			},
			providesTags: (result, error, arg) => {
				if (result?.ids) {
					return [
						...result.ids.map((id) => ({
							type: "Invoice" as const,
							id,
						})),
						{ type: "Invoice", id: "LIST" },
					];
				} else return [{ type: "Invoice", id: "LIST" }];
			},
		}),
		addNewInvoice: builder.mutation({
			query: (initialInvoice) => ({
				url: "/invoices",
				method: "POST",
				body: {
					...initialInvoice,
				},
			}),
			invalidatesTags: [{ type: "Invoice", id: "LIST" }],
		}),
		updateInvoice: builder.mutation({
			query: (initialInvoice) => ({
				url: "/invoices",
				method: "PATCH",
				body: {
					...initialInvoice,
				},
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Invoice", id: arg.id },
			],
		}),
		deleteInvoice: builder.mutation({
			query: ({ id }) => ({
				url: `/invoices`,
				method: "DELETE",
				body: { id },
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Invoice", id: arg.id },
			],
		}),
	}),
});

export const {
	useGetInvoicesQuery,
	useAddNewInvoiceMutation,
	useDeleteInvoiceMutation,
	useUpdateInvoiceMutation,
} = invoicesApiSlice;

// returns the query result object
export const selectInvoicesResult =
	invoicesApiSlice.endpoints.getInvoices.select("");

// creates memoized selector
const selectInvoicesData = createSelector(
	selectInvoicesResult,
	(invoicesResult) => invoicesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
	selectAll: selectAllInvoices,
	selectById: selectInvoiceById,
	selectIds: selectInvoiceIds,
	// Pass in a selector that returns the invoices slice of state
} = invoicesAdapter.getSelectors(
	(state: any) => selectInvoicesData(state) ?? initialState
);
