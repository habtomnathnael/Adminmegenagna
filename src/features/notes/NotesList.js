import { useGetNotesQuery } from "./notesApiSlice"
import Note from "./Note"
import Loading from "../../config/Loading"
import loadingImage from '../../img/loadingImage.gif'
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

const NotesList = () => {
    const {
        data: notes,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotesQuery('notesList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    // ______________________________
    // ___________________________________
    let content

    if (isLoading) content = <span style={{ display: "flex" }}> <img src={loadingImage} style={{ width: '30px', height: '30px' }} /> &nbsp;<p>Loading...</p></span>
    // <Loading />

    if (isError) {
        // content = <p className="errmsg">{error?.data?.message}</p>


        content = (

            <div className=" text-left items-left">
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No Items to display</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by creating adding a new Item.</p>
                <div className="mt-6">
                    <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="-ml-0.5 mr-1.5 h-5 w-5" >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                        <Link to="/dash/notes/new">Add New Item</Link>
                    </button>
                </div>
            </div>
        )



    }

    if (isSuccess) {

        const { ids } = notes

        const tableContent = ids?.length
            ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
            : null

        content = (

            // ++++++++++++++++++++++++++++++ newly added

            <table>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            {/* __________________________________ search part*/}
                            <div className="relative mx-auto max-w-lg rounded-xl bg-white shadow-sm ring-1 ring-black/5">


                                {/* ____________________________________checking combobox */}

                                <div className="flex items-center px-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" w-6 h-6 text-gray-500 mx-2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>

                                    <input
                                        className=" w-full bg-transparent text-sm border-0 text-gray-800 placeholder-gray-400  h-12 focus:outline-none focus:ring-0"
                                        placeholder="Search..."
                                    // value={inputValue}
                                    // onChange={handleChange}
                                    />
                                </div>



                                {/* __________________________________________end of checking combobox */}


                            </div>
                            {/* ___________________________________________ end search part*/}
                            <h1 className="text-base font-semibold text-gray-900">Items</h1>

                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the items in the account including their name, Description, price and more...
                            </p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                            <button
                                type="button"
                                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="-ml-0.5 mr-1.5 h-5 w-5" >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                </svg>
                                <Link to="/dash/notes/new">Add New Item</Link>
                            </button>
                        </div>
                    </div>
                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Post
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Item Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Desc.
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Info.
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {tableContent}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </table>


            // ++++++++++++++++++++++++++++++++++++ end of newly added

        )
    }

    return content
}
export default NotesList