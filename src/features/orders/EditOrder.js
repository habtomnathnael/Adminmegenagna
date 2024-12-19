import { useParams } from 'react-router-dom'
import { useGetOrdersQuery } from './OrderApiSlice'
import EditOrderForm from './EditOrderForm'


const EditOrder = () => {

    const { id } = useParams()


    const { order } = useGetOrdersQuery("ordersList", {
        selectFromResult: ({ data }) => ({
            order: data?.entities[id]
        })
    })


    if (!order) return <div><>Loading...</></div>

    const content = <EditOrderForm order={order} />

    return content

}

export default EditOrder