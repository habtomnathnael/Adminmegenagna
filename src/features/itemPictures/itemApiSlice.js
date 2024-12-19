import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const picsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = picsAdapter.getInitialState()

export const picsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPics: builder.query
            ({
                query: () => ({
                    url: '/ItemImage',
                    validateStatus: (response, result) => {
                        return response.status === 200 && !result.isError
                    },
                }),
                transformResponse: responseData => {
                    const loadedPics = responseData.map(pics => {
                        pics.id = pics._id
                        return pics
                    });
                    return picsAdapter.setAll(initialState, loadedPics)
                },
                providesTags: (result, error, arg) => {
                    if (result?.ids) {
                        return [
                            { type: 'ItemPics', id: 'LIST' },
                            ...result.ids.map(id => ({ type: 'ItemPics', id }))
                        ]
                    } else return [{ type: 'ItemPics', id: 'LIST' }]
                }
            }),
        addNewPics: builder.mutation({
            query: initialPics => ({
                url: '/ItemImage',
                method: 'POST',
                body: {
                    ...initialPics,
                }
            }),
            invalidatesTags: [
                { type: 'ItemPics', id: "LIST" }
            ]
        }),
        updatePics: builder.mutation({
            query: initialPics => ({
                url: '/ItemImage',
                method: 'PATCH',
                body: {
                    ...initialPics,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ItemPics', id: arg.id }
            ]
        }),
        deletePics: builder.mutation({
            query: ({ itemName }) => ({
                url: `/ItemImage`,
                method: 'DELETE',
                body: { itemName }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'ItemPics', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetPicsQuery,
    useAddNewPicsMutation,
    useUpdatePicsMutation,
    useDeletePicsMutation,
} = picsApiSlice

// returns the query result object
export const selectPicsResult = picsApiSlice.endpoints.getPics.select()

// creates memoized selector
const selectPicsData = createSelector(
    selectPicsResult,
    picsResult => picsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllpics,
    selectById: selectPicsById,
    selectIds: selectPicsIds,
} = picsAdapter.getSelectors(state => selectPicsData(state) ?? initialState)