
import { useState, useEffect } from "react"

import { useUpdateOrderMutation, useDeleteOrderMutation } from "./OrderApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";


const EditOrderForm = ({ order }) => {

    const [updateOrder, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateOrderMutation()

    const [deleteOrder, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteOrderMutation()

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState(order.userInfo.firstName)
    const [lastName, setLastName] = useState(order.userInfo.lastName)
    const [phone, setPhone] = useState(order.userInfo.phone)
    const [email, setEmail] = useState(order.userInfo.email)
    const [status, setStatus] = useState("preorder")
    const [description, setDescription] = useState(order.description)
    const [completed, setCompleted] = useState(order.completed)

    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setFirstName('')
            setLastName('')
            setPhone('')
            setEmail('')
            setCompleted('')
            navigate('/dash/orders')
        }

    }, [isSuccess, isDelSuccess, navigate])


    const onFirstNameChanged = e => setFirstName(e.target.value)
    const onLastNameChanged = e => setLastName(e.target.value)
    const onPhonedChanged = e => setPhone(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onStatusChanged = e => setStatus(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)


    const canSave = [firstName, lastName, email].every(Boolean) && !isLoading

    const onSaveOrderClicked = async (e) => {
        if (canSave) {
            await updateOrder({ id: order.id, firstName, lastName, email, phone, description, status, completed })
        }
    }

    const onDeleteOrderClicked = async () => {
        await deleteOrder({ id: order.id })
    }

    const created = new Date(order.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(order.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validFirstNameClass = !firstName ? "form__input--incomplete" : ''
    const validLastNameClass = !lastName ? "form__input--incomplete" : ''
    const validEmailClass = !email ? "form__input--incomplete" : ''
    const validPhoneClass = !phone ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const fOptions = ["confirmed", "intransit", "cancelled", "preorder", "completed"].map((val, ind) => {
        return (
            <option
                key={ind}
                value={val}
            > {val}</option >
        )
    })


    const content_mod = (
        <>
            <div>
                <h2>Edit Item Info #{order.orderTicket}</h2>
                <div className="flex justify-between">

                    <div className="block flex-nowrap">
                        <p className="flex text-xs">Created At:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{created}</p>
                        <p className="form__updated text-xs">Updated At:&nbsp;&nbsp;&nbsp;&nbsp;{updated}</p>
                    </div>
                </div>
            </div>

            <p className={errClass} >{errContent}</p>
            {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}

            <form class="w-full" onSubmit={e => e.preventDefault()}>

                <div class="flex flex-wrap -mx-3 my-6 mb-6">

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="fristName">
                            First Name
                        </label>
                        <input class={`${validFirstNameClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            id="fristName"
                            name="fristName"
                            type="text"
                            autoComplete="off"
                            value={firstName}
                            onChange={onFirstNameChanged}

                        />

                        {/* ++++++++++++++++++++++++++++++++++++++++++++ */}

                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="lastName">
                            Last Name
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="lastName"
                            name="lastName"
                            type="text"
                            autoComplete="off"
                            value={lastName}
                            onChange={onLastNameChanged}
                        />

                    </div>
                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="lastName">
                            Phone #
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="phone"
                            name="phone"
                            type="text"
                            autoComplete="off"
                            value={phone}
                            onChange={onPhonedChanged}
                        />

                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="email">
                            Email
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="off"
                            value={email}
                            onChange={onEmailChanged}
                        />
                    </div>

                    <div class="w-full md:w-1/3 px-3 my-6 md:mb-0 flex">
                        <div>
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="email">
                                Order Status
                            </label>
                            <select
                                id="fType"
                                name="fType"
                                className=' text-black'
                                value={status}
                                onChange={onStatusChanged}
                            >
                                {fOptions}
                            </select>
                        </div>
                    </div>




                    <div class="w-full px-3 my-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="description">
                            Shipping Address
                        </label>
                        <div>{order.deliveryInfo.deliveryAddress.streetAdress}</div>
                        <div>{order.deliveryInfo.deliveryAddress.city}&nbsp; {order.deliveryInfo.deliveryAddress.state} &nbsp; {order.deliveryInfo.deliveryAddress.zipCode}</div>
                        <div>{order.deliveryInfo.deliveryAddress.country}</div>
                        <div></div>
                        <div></div>

                        <label class=" mt-2 block uppercase tracking-wide text-gray-500 text-xs font-bold mb-2"
                            htmlFor="description">
                            Additional discription
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="description"
                            name="description"
                            value={description}
                            onChange={onDescriptionChanged}
                        />
                        <p class="text-gray-600 text-xs italic">
                            Please describe if the wrong address is filled ...
                        </p>
                    </div>


                    {/* ready to post */}

                    <div className="inline-block align-middle w-full my-6 px-3 mb-6 md:mb-0">

                        {/* isSpicy */}
                        <div className="align-middle">
                            <label className="w-full items-center align-middle mr-2" htmlFor="note-completed" id="completed">
                                Order completed ?:
                            </label>
                            <input
                                className="form__checkbox w-[24px] h-[24px] align-middle"
                                id="completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </div>
                    </div>

                    <br className=" w-full" />
                    <button
                        title="Save"
                        className="inline-block align-middle w-full my-10 ml-1 md:w-[45%] mr-2 mb-6 md:mb-0 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={onSaveOrderClicked}
                        disabled={!canSave}
                    >
                        Save

                    </button>
                    <button
                        className="inline-block align-middle w-full my-10 mr-1 md:w-[45%] ml-2 mb-6 md:mb-0 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        title="Delete"
                        onClick={onDeleteOrderClicked}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </>
    )

    return content_mod
}

export default EditOrderForm