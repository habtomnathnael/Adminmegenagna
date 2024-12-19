import React from 'react'
import { useGetUsersQuery } from '../../features/users/usersApiSlice'
import { memo } from 'react'


const Member = ({ userId }) => {

    let content = null

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    })

    if (user) {
        content =
            <div className=' flex justify-between items-center'>
                <div className='flex items-center'>
                    <h2 className=' font-bold'>{user.username}</h2>
                    {/* <span className=' font-semibold text-gray-400 text-sm'>{user._id}</span> */}
                </div>
                <div className='mx-4 flex justify-between items-center'>
                    <span
                        className={`text-xs text-gray-700 font-semibold dark:bg-gray-500 dark:text-gray-300`}>
                        {user.roles?.length ? (user.roles.includes("Admin") || user.roles.includes("Manager")) ? <div className={`${(user.roles.includes("Admin") || (user.roles.includes("Manager"))) ? "bg-green-100 " : null} rounded-sm`}>Admin</div> : <div className=' bg-yellow-100 rounded-sm'>Employee</div> : null}
                    </span>

                </div>
            </div>


        return content

    }
}

export default Member