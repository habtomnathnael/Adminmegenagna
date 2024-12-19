import React from 'react'

const OrderModal = (props) => {
    const { order } = props
    console.log(order)

    const fOptions = ["confirmed", "intransit", "cancelled", "preorder", "completed"].map((val, ind) => {
        return (
            <option
                key={ind}
                value={val}
            > {val}</option >
        )
    })



    let content = (

        <div
            data-dialog-backdrop="modal"
            data-dialog-backdrop-close="true"
            class="fixed inset-0 z-10000 overflow-y-auto grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        >
            <div
                data-dialog="modal"
                class="relative m-4 p-4 w-2/5 min-w-[55%] max-w-[55%] rounded-lg bg-white shadow-sm"
            >

                <form class="w-full" onSubmit={e => e.preventDefault()}>

                    <div class="flex flex-wrap -mx-3 my-1 mb-2">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                for="fristName">
                                First Name
                            </label>
                            <input class={` appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-1 px-2 mb-3 leading-tight focus:outline-none focus:bg-white`}
                                id="fristName"
                                name="fristName"
                                type="text"
                                autoComplete="off"
                                value={order.userInfo.firstName}
                            // onChange={onFirstNameChanged}

                            />

                            {/* ++++++++++++++++++++++++++++++++++++++++++++ */}

                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="lastName">
                                Last Name
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="lastName"
                                name="lastName"
                                type="text"
                                autoComplete="off"
                                value={order.userInfo.lastName}
                            // value={lastName}
                            // onChange={onLastNameChanged}
                            />

                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="lastName">
                                E-mail
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="phone"
                                name="phone"
                                type="text"
                                autoComplete="off"
                                value={order.userInfo.email}
                            // value={phone}
                            // onChange={onPhonedChanged}
                            />

                        </div>
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                htmlFor="lastName">
                                Phone#
                            </label>
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="phone"
                                name="phone"
                                type="text"
                                autoComplete="off"
                                value={order.userInfo.phone}
                            // value={phone}
                            // onChange={onPhonedChanged}
                            />

                        </div>
                        <div class="w-full h-auto md:w-full px-3 mt-6 mb-3 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                                htmlFor="lastName">
                                Shipping Address
                            </label>
                            {/* <textarea class="appearance-none block w-full h-auto bg-gray-200 text-gray-700 border border-gray-600 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="phone"
                                name="phone"
                                type="text"
                                autoComplete="off" */}
                            {/* // value={phone}
                            // onChange={onPhonedChanged} */}
                            {/* > */}

                            {/* <div>{order.deliveryInfo.deliveryAddress.streetAdress}</div> */}
                            {/* <p>{order.deliveryInfo.deliveryAddress.streetAdress}</p> */}
                            <div>
                                <input
                                    type='text'
                                    className=' text-black'
                                    value={order.deliveryInfo.deliveryAddress.streetAdress}
                                /></div>
                            <div className=' flex'>
                                <input
                                    type='text'

                                    className=' w-1/5 text-black'
                                    value={order.deliveryInfo.deliveryAddress.city}
                                />
                                <input
                                    type='text'
                                    className=' w-1/6 text-black'
                                    value={order.deliveryInfo.deliveryAddress.state}
                                />
                                <input
                                    type='text'
                                    className=' w-1/6 text-black'
                                    value={order.deliveryInfo.deliveryAddress.zipCode}
                                />

                            </div>
                            <div>
                                <input
                                    type='text'
                                    className=' w-1/6 text-black'
                                    value={order.deliveryInfo.deliveryAddress.country}
                                />
                            </div>
                            {/* <div>{order.deliveryInfo.deliveryAddress.country}</div> */}
                            {/* <div>{order.deliveryInfo.deliveryAddress.streetAdress}</div>
                            <div>{order.deliveryInfo.deliveryAddress.city} &nbsp; {order.deliveryInfo.deliveryAddress.state} &nbsp;  {order.deliveryInfo.deliveryAddress.zipCode}</div>
                            <div>{order.deliveryInfo.deliveryAddress.country}</div> */}

                            {/* The key to more success is to have a lot of pillows. Put it this
                                way, it took me twenty five years to get these plants, twenty five
                                years of blood sweat and tears, and I&apos;m never giving up,
                                I&apos;m just getting started. I&apos;m up to something. Fan luv. */}


                            {/* </textarea> */}

                        </div>
                        <div className=' flex justify-between '>
                            <div>
                                <label className="form__label form__checkbox-container mt-6 text-black" htmlFor="username">
                                    Order Status:</label>
                                <select
                                    id="fType"
                                    name="fType"
                                    className=' text-black'
                                // className="form__select"
                                // value={fType}
                                // onChange={onfTypeChanged}
                                >
                                    {fOptions}
                                </select>
                            </div>
                        </div>


                    </div>
                </form>

                <div class="relative border-t border-slate-200 py-4 leading-normal text-slate-900">
                    <div className='flex text-black'>
                        <p>Orders: &nbsp;</p>
                        <div>{order.orders.map((val, idx) => (
                            <p>Bar-Code: &nbsp;{val.barCode}&nbsp; &nbsp; &nbsp; &nbsp; Quantity: &nbsp;
                                <span>
                                    <input
                                        className=' w-1/5'
                                        type='number'
                                        value={parseInt(val.Price.amount)} />
                                </span>
                            </p>

                        ))}</div>
                    </div>
                    {/* The key to more success is to have a lot of pillows. Put it this
                    way, it took me twenty five years to get these plants, twenty five
                    years of blood sweat and tears, and I&apos;m never giving up,
                    I&apos;m just getting started. I&apos;m up to something. Fan luv. */}
                </div>
                <div class="flex shrink-0 flex-wrap items-center pt-4 justify-end">
                    <button onClick={() => props.setIsOpenDialog(!props.isOpenDialog)} data-dialog-close="true" class="rounded-md border border-transparent py-1 px-2 text-center text-sm transition-all text-slate-600 hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
                        Cancel
                    </button>
                    <button data-dialog-close="true" class="rounded-md bg-green-600 py-1 px-2 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" type="button">
                        Update
                    </button>
                </div>
            </div>
        </div>

    )

    let content_revised = (
        <div
            class="fixed y-0 x-0 inset-0 z-10 overflow-y-auto grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"        >
            <div
                class="relative m-3 p-2 w-3/5 max-w-[55%] rounded-lg bg-white shadow-sm"
            >

                <div class="bg-white shadow rounded-lg p-8">
                    <h2 class="text-xl font-bold mb-4">{order.userInfo.firstName} {order.userInfo.lastName}</h2>
                    <p class="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est
                        vitae tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                        suscipit. Nunc finibus vel ante id euismod. Vestibulum ante ipsum primis in faucibus orci luctus
                        et ultrices posuere cubilia Curae; Aliquam erat volutpat. Nulla vulputate pharetra tellus, in
                        luctus risus rhoncus id.
                    </p>


                    <h2 class="text-xl font-bold mt-6 mb-4">Experience</h2>
                    <div class="mb-6">
                        <div class="flex justify-between flex-wrap gap-2 w-full">
                            <span class="text-gray-700 font-bold">Web Developer</span>
                            <p>
                                <span class="text-gray-700 mr-2">at ABC Company</span>
                                <span class="text-gray-700">2017 - 2019</span>
                            </p>
                        </div>
                        <p class="mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus est vitae
                            tortor ullamcorper, ut vestibulum velit convallis. Aenean posuere risus non velit egestas
                            suscipit.
                        </p>
                    </div>


                </div>


            </div>
        </div>
    )
    const content_mod = (
        <>

            <div
                className=' class="fixed y-0 x-0 inset-0 z-10 overflow-y-auto grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"        >
           '
            >
                <h2>Edit Item Info #
                    {/* {reservation.ticket} */}

                </h2>
                <div className="flex justify-between">

                    <div className="block flex-nowrap">
                        <p className="flex text-xs">Created At:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {/* {created} */}
                        </p>
                        <p className="form__updated text-xs">Updated At:&nbsp;&nbsp;&nbsp;&nbsp;
                            {/* {updated} */}
                        </p>
                    </div>
                </div>
            </div>

            {/* <p className={errClass} >{errContent}</p> */}
            {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}

            <form class="w-full" onSubmit={e => e.preventDefault()}>

                <div class="flex flex-wrap -mx-3 my-6 mb-6">

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="fristName">
                            First Name
                        </label>
                        <input class={` appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            id="fristName"
                            name="fristName"
                            type="text"
                            autoComplete="off"
                        // value={firstName}
                        // onChange={onFirstNameChanged}

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
                        // value={lastName}
                        // onChange={onLastNameChanged}
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
                        // value={phone}
                        // onChange={onPhonedChanged}
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
                        // value={email}
                        // onChange={onEmailChanged}
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
                        // value={reserveDate}
                        // onChange={onReserveDateChanged}

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
                        // value={reserveTime}
                        // onChange={onReserveTimeChanged}

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
                        // value={partySize}
                        // onChange={onRartySizeChanged}
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
                        // value={description}
                        // onChange={onDescriptionChanged}
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
                            // checked={completed}
                            // onChange={onCompletedChanged}
                            />
                        </div>
                    </div>

                    <br className=" w-full" />
                    <button
                        title="Save"
                        className="inline-block align-middle w-full my-10 ml-1 md:w-[45%] mr-2 mb-6 md:mb-0 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    // onClick={onSaveReservationClicked}
                    // disabled={!canSave}
                    >
                        Save

                    </button>
                    <button
                        className="inline-block align-middle w-full my-10 mr-1 md:w-[45%] ml-2 mb-6 md:mb-0 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        title="Delete"
                    // onClick={onDeleteNoteClicked}
                    >
                        Delete
                    </button>
                </div>
            </form>
        </>
    )
    return content
}

export default OrderModal