import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

// import { useSelector } from 'react-redux'
// import { selectUserById } from './usersApiSlice'

import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'




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






const User = ({ userId }) => {
    // const user = useSelector(state => selectUserById(state, userId))

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })



    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'bg-gray-100'

        return (
            // <tr className="table__row user">
            //     <td className={`table__cell ${cellStatus}`}>{user.username}</td>
            //     <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
            //     <td className={`table__cell ${cellStatus}`}>
            //         <button
            //             className="icon-button table__button"
            //             onClick={handleEdit}
            //         >
            //             <FontAwesomeIcon icon={faPenToSquare} />
            //         </button>
            //     </td>
            // </tr>


            // _______________________________________newly added


            <tr key={people.email}>
                <td className={`${cellStatus} whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0`}>
                    <div className=" flex items-center ml-4 font-medium text-gray-900">{user.username}</div>

                </td>
                <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>{userRolesString}</td>

                <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>
                    <span className={`inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium ${user.active ? "text-green-700 ring-1 ring-inset ring-green-600/20" : "text-red-700 ring-1 ring-inset ring-red-600/20"}`}>
                        {user.active ? "Active" : "Inactive"}
                    </span>
                </td>

                <td className={`${cellStatus} relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0`}>
                    <a href="#" className="text-indigo-600 hover:text-indigo-900"
                        onClick={handleEdit}
                    >
                        Edit<span className="sr-only">, {user.username}</span>
                    </a>
                </td>
            </tr>



            // _________________________________________close of newly added




        )

    } else return null
}

const memoizedUser = memo(User)


export default memoizedUser