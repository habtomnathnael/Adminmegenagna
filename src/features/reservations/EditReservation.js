import { useParams } from 'react-router-dom'

import EditReservationForm from './EditReservationForm'

import { useGetReservationsQuery } from './reservationApiSlice'

import Loading from '../../config/Loading'

const EditReservation = () => {
    const { id } = useParams()

    const { reservation } = useGetReservationsQuery("reservationsList", {
        selectFromResult: ({ data }) => ({
            reservation: data?.entities[id]
        })
    })

    if (!reservation) return <div><>Loading...</></div>

    const content = <EditReservationForm reservation={reservation} />

    return content
}

export default EditReservation