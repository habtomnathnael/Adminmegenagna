import { useState, useEffect } from "react"
import { useAddNewReservationMutation } from "./reservationApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";


function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
function validatePhone(phone) {
    const phonePattern = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var digits = phone.replace(/\D/g, "");
    return phonePattern.test(digits)
}

const NewReservationForm = () => {

    const [addNewReserve, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewReservationMutation()

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [reserveDate, setReserveDate] = useState("")
    const [reserveTime, setReserveTime] = useState("")
    const [description, setDescription] = useState("")
    const [partySize, setPartySize] = useState("")
    const [completed, setCompleted] = useState(false)

    useEffect(() => {
        if (isSuccess) {
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

    }, [isSuccess, navigate])

    const onFirstNameChanged = e => setFirstName(e.target.value)
    const onLastNameChanged = e => setLastName(e.target.value)
    const onPhonedChanged = e => setPhone(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onReserveDateChanged = e => setReserveDate(e.target.value)
    const onReserveTimeChanged = e => setReserveTime(e.target.value)
    const onRartySizeChanged = e => setPartySize(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)


    const canSave = [firstName, lastName, validateEmail(email), validatePhone(phone)].every(Boolean) && !isLoading

    const onSaveReservationClicked = async (e) => {
        e.preventDefault()

        // console.log(canSave)

        if (canSave) {
            await addNewReserve({ firstName, lastName, email, phone, reserveDate, reserveTime, partySize, description, completed }).then(
                // console.log("done")
            )
        }

    }
    const onClearClicked = async (e) => {
        setFirstName('')
        setLastName('')
        setPhone('')
        setEmail('')
        setReserveDate('')
        setReserveTime('')
        setPartySize('')
        setDescription('')
        setCompleted('')
    }

    const errClass = (isError) ? "errmsg" : "offscreen"
    const validFirstNameClass = !firstName ? "form__input--incomplete" : ''
    const validLastNameClass = !lastName ? "form__input--incomplete" : ''
    const validEmailClass = !validateEmail(email) ? "form__input--incomplete" : ''
    const validPhoneClass = !validatePhone(phone) ? "form__input--incomplete" : ''
    const validReserveDate = !reserveDate ? "form__input--incomplete" : ''
    const validReserveTime = !reserveTime ? "form__input--incomplete" : ''
    const validPartySize = !partySize ? "form__input--incomplete" : ''
    const validDescription = !description ? "form__input--incomplete" : ''
    const errContent = (error?.data?.message) ?? ''

    const content_mod = (
        <>
            <h2>Edit Item Info #</h2>

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
                        <input
                            class={`${validLastNameClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
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
                            htmlFor="Phone">
                            Phone #
                        </label>
                        <input
                            class={`${validPhoneClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
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
                        <input
                            class={`${validEmailClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="off"
                            value={email}
                            onChange={onEmailChanged}
                        />

                    </div>

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
                            class={`${validReserveDate} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
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
                            class={`${validReserveTime} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                            value={reserveTime}
                            onChange={onReserveTimeChanged}
                        />

                    </div>
                    <div class="w-full my-3 md:w-1/3 px-3 mb-6 md:mb-0">
                        <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            // className="mb-3 block text-base font-medium text-[#07074D]"

                            htmlFor="partySize">
                            How many guest are you bringing?
                        </label>
                        <input
                            class={`${validPartySize} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
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
                            class={`${validDescription} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                            id="description"
                            name="description"
                            value={description}
                            onChange={onDescriptionChanged}
                        />
                        <p class="text-gray-600 text-xs italic">
                            Please describe the party type...
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
                        onClick={onClearClicked}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </>
    )

    return content_mod
}

export default NewReservationForm