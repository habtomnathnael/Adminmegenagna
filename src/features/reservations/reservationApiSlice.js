import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const reservationsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = reservationsAdapter.getInitialState()

export const reservationApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReservations: builder.query({
            query: () => ({
                url: '/reservation',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),

            transformResponse: responseData => {
                const loadedReservations = responseData.map(reserve => {
                    reserve.id = reserve._id
                    return reserve
                });
                return reservationsAdapter.setAll(initialState, loadedReservations)
            },

            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'TableReservation', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'TableReservation', id }))
                    ]
                } else return [{ type: 'TableReservation', id: 'LIST' }]
            }
        }),
        addNewReservation: builder.mutation({
            query: initialReserveData => ({
                url: '/reservation',
                method: 'POST',
                body: {
                    ...initialReserveData,
                }
            }),
            invalidatesTags: [
                { type: 'TableReservation', id: "LIST" }
            ]
        }),
        updateReservation: builder.mutation({
            query: initialReserveData => ({
                url: '/reservation',
                method: 'PATCH',
                body: {
                    ...initialReserveData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'TableReservation', id: arg.id }
            ]
        }),
        deleteReservation: builder.mutation({
            query: ({ id }) => ({
                url: `/reservation`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'TableReservation', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetReservationsQuery,
    useAddNewReservationMutation,
    useUpdateReservationMutation,
    useDeleteReservationMutation,
} = reservationApiSlice

// returns the query result object
export const selectReservationsResult = reservationApiSlice.endpoints.getReservations.select()

// creates memoized selector
const selectReservationsData = createSelector(
    selectReservationsResult,
    reservationsResult => reservationsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllReservations,
    selectById: selectReserveById,
    selectIds: selectReserveIds
    // Pass in a selector that returns the users slice of state
} = reservationsAdapter.getSelectors(state => selectReservationsData(state) ?? initialState)