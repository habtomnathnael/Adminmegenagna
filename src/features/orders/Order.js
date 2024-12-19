import { useNavigate } from 'react-router-dom'
import { useGetOrdersQuery } from './OrderApiSlice'
import { memo, useState } from 'react'

const Order = ({ OrderId }) => {

    const [view, setView] = useState(false)

    const { order } = useGetOrdersQuery('ordersList', {
        selectFromResult: ({ data }) => ({
            order: data?.entities[OrderId]
        })
    })

    const navigate = useNavigate()

    if (order) {
        const created = new Date(order.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(order.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/orders/${OrderId}`)
        const cellStatus = order.completed ? '' : 'bg-gray-100'

        return (
            <>
                <tr key={order.id}>
                    <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>
                        <span className={`inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium ${order.completed ? "text-green-700 ring-1 ring-inset ring-green-600/20" : "text-red-700 ring-1 ring-inset ring-red-600/20"}`}>
                            {order.orderTicket}
                        </span>
                    </td>
                    <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>
                        <span className={`inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium ${order.completed ? "text-green-700 ring-1 ring-inset ring-green-600/20" : "text-red-700 ring-1 ring-inset ring-red-600/20"}`}>
                            {/* {order.createdAt} */}
                            {new Date(order.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
                            }
                        </span>
                    </td>
                    <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>
                        <div className="text-gray-900">
                            {order.orders.map((val, idx) => (<div key={idx}>
                                <p><span className={`${order.orders.length <= 1 ? "hidden" : "block"} inline-flex`}>{parseInt(idx) + 1}:</span> $ {val.Price.totalPrice}</p>
                            </div>
                            ))}
                        </div>
                    </td>

                    <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>
                        <div>
                            {(order.status === "preorder") ?
                                (
                                    <p className='inline-flex items-center rounded-md bg-yellow-100 px-3 py-0 text-xs font-medium'>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        Pre-order
                                    </p>
                                ) :
                                (order.status === "intransit") ?
                                    (
                                        <p className='inline-flex items-center bg-yellow-200 rounded-md px-3 py-0 text-xs font-medium'>

                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3 mr-2">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                            In transit
                                        </p>
                                    ) :
                                    (order.status === "confirmed") ?
                                        (
                                            <p className='inline-flex items-center rounded-md bg-green-100 px-3 py-0 text-xs font-medium'>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3 mr-2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                </svg>
                                                Confirmed
                                            </p>
                                        ) :
                                        (order.status === "cancelled") ?
                                            (
                                                <p className='inline-flex items-center rounded-md bg-red-100 px-3 py-0 text-xs font-medium'>

                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3 mr-2">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                    </svg>
                                                    Cancelled
                                                </p>
                                            ) :
                                            (<p className='inline-flex items-center rounded-md bg-red-100 text-red-700 px-3 py-0 text-xs font-medium'>

                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3 mr-2">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                                </svg>
                                                Error

                                            </p>)
                            }


                        </div>
                    </td>
                    <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500 `}>
                        <svg onClick={() => setView(!view)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                        {
                            view &&
                            <div className='w-40' >
                                <div className='items-center rounded-md px-3 text-xs font-medium cursor-pointer'>
                                    <p onClick={() => {
                                        handleEdit()
                                        setView(false)
                                    }} className=' inline-flex items-center bg-green-100 text-black px-3 py-0'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        </svg>

                                        View Order Detail

                                    </p>
                                </div>

                                <div className='items-center rounded-md px-3 py-1 text-xs font-medium cursor-pointer'>
                                    <p className=' cursor-pointer inline-flex items-center bg-red-100 text-red-700 px-3 py-0'>

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-3 mr-2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>

                                        Delete The Order</p>

                                </div>
                            </div>

                        }
                    </td>

                </tr>

            </>

            // _________________________________________________________

        )

    } else return null

}
const memoizedOrder = memo(Order)

export default memoizedOrder