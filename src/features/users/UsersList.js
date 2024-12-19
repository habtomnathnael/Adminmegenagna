import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import loadingImage from '../../img/loadingImage.gif'
import { Link } from "react-router-dom"

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <span style={{ display: "flex" }}> <img src={loadingImage} style={{ width: '30px', height: '30px' }} /> &nbsp;<p>Loading...</p></span>
    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        // content = (
        //     <table className="table table--users">
        //         <thead className="table__thead">
        //             <tr>
        //                 <th scope="col" className="table__th user__username">Username</th>
        //                 <th scope="col" className="table__th user__roles">Roles</th>
        //                 <th scope="col" className="table__th user__edit">Edit</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {tableContent}
        //         </tbody>
        //     </table>
        // )

        // _______________________________________newly modified


        content = (

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
                            <h1 className="text-base font-semibold text-gray-900">Users</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the users in your account including their name, title, email and role.
                            </p>
                        </div>
                        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">

                            {/* <p></p> */}

                            <button
                                type="button"
                                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                <Link to="/dash/users/new">Add New Admin</Link>
                                {/* Add user */}
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
                                                Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Role
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Status
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {/* {people.map((person) => (
                                        <tr key={person.email}>
                                            <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                                                <div className="flex items-center">
                                                    <div className="h-11 w-11 flex-shrink-0">
                                                        <img alt="" src={person.image} className="h-11 w-11 rounded-full" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">{person.name}</div>
                                                        <div className="mt-1 text-gray-500">{person.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <div className="text-gray-900">{person.title}</div>
                                                <div className="mt-1 text-gray-500">{person.department}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                                                <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{person.role}</td>
                                            <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    Edit<span className="sr-only">, {person.name}</span>
                                                </a>
                                            </td>
                                        </tr>
                                    ))} */}
                                        {tableContent}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </table>

        )








        // _________________________________________end of newly modified



    }

    // _____________________________________________ newly added modification



    // ________________________________________________?


    const people = [
        {
            name: 'Lindsay Walton',
            title: 'Front-end Developer',
            department: 'Optimization',
            email: 'lindsay.walton@example.com',
            role: 'Member',
            image:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        // More people...
    ]















    // _____________________________________________________close of newly added



    return content



}
export default UsersList