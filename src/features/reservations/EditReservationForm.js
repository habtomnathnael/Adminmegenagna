
import { useState, useEffect } from "react"

import { useUpdateReservationMutation, useDeleteReservationMutation } from "./reservationApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";

const EditReservationForm = ({ reservation }) => {

    const [updateReservation, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateReservationMutation()

    const [deleteReservation, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteReservationMutation()


    const navigate = useNavigate()

    const [firstName, setFirstName] = useState(reservation.firstName)
    const [lastName, setLastName] = useState(reservation.lastName)
    const [phone, setPhone] = useState(reservation.phone)
    const [email, setEmail] = useState(reservation.email)
    const [reserveDate, setReserveDate] = useState(reservation.reserveDate)
    const [reserveTime, setReserveTime] = useState(reservation.reserveTime)
    const [description, setDescription] = useState(reservation.description)
    const [partySize, setPartySize] = useState(reservation.partySize)
    const [completed, setCompleted] = useState(reservation.completed)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setFirstName('')
            setLastName('')
            setPhone('')
            setEmail('')
            setReserveDate('')
            setReserveTime('')
            setPartySize('')
            setDescription('')
            setCompleted('')
            navigate('/dash/reservation')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onFirstNameChanged = e => setFirstName(e.target.value)
    const onLastNameChanged = e => setLastName(e.target.value)
    const onPhonedChanged = e => setPhone(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onReserveDateChanged = e => setReserveDate(e.target.value)
    const onReserveTimeChanged = e => setReserveTime(e.target.value)
    const onRartySizeChanged = e => setPartySize(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)


    const canSave = [firstName, lastName, email].every(Boolean) && !isLoading

    const onSaveReservationClicked = async (e) => {
        if (canSave) {
            await updateReservation({ id: reservation.id, firstName, lastName, email, phone, reserveDate, reserveTime, partySize, description, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteReservation({ id: reservation.id })
    }

    const created = new Date(reservation.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(reservation.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validFirstNameClass = !firstName ? "form__input--incomplete" : ''
    const validLastNameClass = !lastName ? "form__input--incomplete" : ''
    const validEmailClass = !email ? "form__input--incomplete" : ''
    const validPhoneClass = !phone ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content_mod = (
        <>

            <div>
                <h2>Edit Item Info #{reservation.ticket}</h2>
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
                            Last Name
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

                    {/* <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="reserveDate">
                            Reservation Date
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="reserveDate"
                            name="reserveDate"
                            type="text"
                            autoComplete="off"
                            value={reserveDate}
                            onChange={onReserveDateChanged}
                        />
                    </div> */}
                    {/* +++++++++++++++++++++++++++++++++++ */}


                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">

                        <label
                            htmlFor="reserveDate"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        >
                            Date
                        </label>
                        <input
                            type="date"
                            name="reserveDate"
                            id="reserveDate"
                            // className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            autoComplete="off"
                            value={reserveDate}
                            onChange={onReserveDateChanged}

                        />

                    </div>



                    {/* +++++time+++++ */}



                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            htmlFor="reserveTime"
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"

                        >
                            Time
                        </label>
                        <input
                            type="time"
                            name="reserveTime"
                            id="reserveTime"
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={reserveTime}
                            onChange={onReserveTimeChanged}

                        />

                    </div>






                    {/* +++++++++++++++++++++++++++++++++++ */}
                    {/* <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="reserveTime">
                            Reservation Time
                        </label>
                        <input
                            class="
                            appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500
                            
                            "
                            id="reserveTime"
                            name="reserveTime"
                            type="text"
                            autoComplete="off"
                            value={reserveTime}
                            onChange={onReserveTimeChanged}
                        />
                    </div> */}


                    <div class="w-full my-3 md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            // className="mb-3 block text-base font-medium text-[#07074D]"

                            htmlFor="partySize">
                            How many guest are you bringing?
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="partySize"
                            name="partySize"
                            type="number"
                            placeholder="5"
                            min="0"
                            autoComplete="off"
                            value={partySize}
                            onChange={onRartySizeChanged}
                        />
                    </div>

                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="description">
                            Description
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="description"
                            name="description"
                            value={description}
                            onChange={onDescriptionChanged}
                        />
                        <p class="text-gray-600 text-xs italic">
                            Please descritp the party type...
                        </p>
                    </div>


                    {/* ready to post */}

                    <div className="inline-block align-middle w-full my-6 px-3 mb-6 md:mb-0">

                        {/* isSpicy */}
                        <div className="align-middle">
                            <label className="w-full items-center align-middle mr-2" htmlFor="note-completed" id="completed">
                                Reservation completed ?:
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
                        onClick={onSaveReservationClicked}
                        disabled={!canSave}
                    >
                        Save

                    </button>
                    <button
                        className="inline-block align-middle w-full my-10 mr-1 md:w-[45%] ml-2 mb-6 md:mb-0 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        title="Delete"
                        onClick={onDeleteNoteClicked}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </>
    )

    return content_mod
}

export default EditReservationForm