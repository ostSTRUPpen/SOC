import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../../app/api/apiSlice";

const invoicesAdapter = createEntityAdapter({
	sortComparer: (a: any, b: any) =>
		a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = invoicesAdapter.getInitialState();

export const invoicesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getInvoices: builder.query({
			query: () => ({
				url: "/invoices",
				validateStatus: (response: any, result: any) => {
					return response.status === 200 && !result.isError;
				},
			}),
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

export const selectInvoicesResult =
	invoicesApiSlice.endpoints.getInvoices.select("");

const selectInvoicesData = createSelector(
	selectInvoicesResult,
	(invoicesResult) => invoicesResult.data
);

export const {
	selectAll: selectAllInvoices,
	selectById: selectInvoiceById,
	selectIds: selectInvoiceIds,
} = invoicesAdapter.getSelectors(
	(state: any) => selectInvoicesData(state) ?? initialState
);
