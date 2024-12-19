import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

// import { useSelector } from 'react-redux'
// import { selectUserById } from './usersApiSlice'

import { useGetReservationsQuery } from './reservationApiSlice'
import { memo } from 'react'

const Reservation = ({ ReservationId }) => {
    // const user = useSelector(state => selectUserById(state, userId))

    const { reservation } = useGetReservationsQuery("ReservationsList", {
        selectFromResult: ({ data }) => ({
            reservation: data?.entities[ReservationId]
        })
    })


    // console.log(reservation)


    const navigate = useNavigate()

    if (reservation) {


        const created = new Date(reservation.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(reservation.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })


        const handleEdit = () => navigate(`/dash/reservation/${ReservationId}`)

        const cellStatus = reservation.completed ? '' : 'bg-gray-100'


        // const userRolesString = user.roles.toString().replaceAll(',', ', ')

        // const cellStatus = user.active ? '' : 'table__cell--inactive'

        return (

            <tr key={reservation.email}>
                <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>
                    <span className={`inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium ${reservation.completed ? "text-green-700 ring-1 ring-inset ring-green-600/20" : "text-red-700 ring-1 ring-inset ring-red-600/20"}`}>
                        {reservation.completed ? "Yes" : "No"}
                    </span>
                </td>
                <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>
                    <div className="text-gray-900">First Name: {reservation.firstName}</div>
                    <div className="text-gray-900">First Name: {reservation.lastName}</div>
                </td>
                <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>
                    <div className="text-gray-900">phone: {reservation.phone}</div>
                    <div className=' w-[300px] truncate'>Email: {reservation.email}</div>
                </td>

                <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500 `}>
                    <div className="text-gray-900">part size: {reservation.partySize}</div>

                    <div className="text-gray-900">Date: {reservation.reserveDate}</div>
                    <div className="text-gray-900">Time: {reservation.reserveTime}</div>

                </td>

                <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500 `}>
                    <div>
                        <p className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            onClick={handleEdit}
                        >
                            Edit
                        </p>
                    </div>
                </td>
            </tr>

        )

    } else return null
}

const memoizedReservation = memo(Reservation)


export default memoizedReservation