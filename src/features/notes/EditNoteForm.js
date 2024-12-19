import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useDeletePicsMutation } from "../itemPictures/itemApiSlice";

import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import DeleteImage from "../itemPictures/DeleteImage"
import NewImage from '../itemPictures/NewImage'
import axios from "axios";
import GridImage from "../itemPictures/GridImage";


const EditNoteForm = ({ note, users }) => {

    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const [deletePics, {
        isSuccess: isDelPicSuccess,
        isError: isDelPicError,
        error: delePicrror
    }] = useDeletePicsMutation()


    const navigate = useNavigate()

    const [fType, setfType] = useState(note.fType)
    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

    const [servingTime, setServingTime] = useState(note.servingTime)
    const [fPrice, setfPrice] = useState(note.fPrice)
    const [fStars, setfStars] = useState(note.fStars)
    // const [itemName, setItemName] = useState(note.fPicName)
    const [barCode, setBarCode] = useState(note.barCode)

    const [size, setSize] = useState(note.size)
    const [fPicName, setfPicName] = useState(note.fPicName)
    const [uploadStatus, setUploadStatus] = useState("select");

    const [isSpicy, setIsSpicy] = useState(note.isSpicy)
    const [isVegeterian, setIsVegeterian] = useState(note.isVegeterian)
    const [isVegan, setIsVegan] = useState(note.isVegan)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const onfTypeChanged = e => setfType(e.target.value)
    const onServingTimeChanged = e => setServingTime(e.target.value)
    const onfPriceChanged = e => setfPrice(e.target.value)
    const onfStarsChanged = e => setfStars(e.target.value)
    const onBarCodeChanged = e => setBarCode(e.target.value)
    const onSizeChange = e => setSize(e.target.value)

    const onIsSpicyChanged = e => setIsSpicy(prev => !prev)

    const onIsVegeterianChanged = e => setIsVegeterian(prev => !prev)

    const onIsVeganChanged = e => setIsVegan(prev => !prev)

    const fOptions = ["Breakfast", "Lunch", "Dinner", "lunch&Dinner", "Vegetarian", "drinks", "spices", "others"].map((val, ind) => {
        return (
            <option
                key={ind}
                value={val}
            > {val}</option >
        )
    })

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, fType, fPicName, title, barCode, text, size, barCode, servingTime, fPrice, isSpicy, isVegeterian, isVegan, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deletePics({ fPicName: fPicName })
        await updateNote({ id: note.id, user: userId, fType, fPicName, title, barCode, text, servingTime, fPrice, completed })
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })


    const SOptions = ["XXL", "XL", "L", "M", "S", "XS", "500ml", "250ml", "80ml", "others"].map((val, ind) => {
        return (
            <option
                key={ind}
                value={val}
            > {val}</option >
        )
    })


    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''
    const validSizeClass = !size ? "form__input--incomplete" : ''
    const validBarCodeClass = !barCode ? "form__input--incomplete" : ''
    const validServingTimeClass = !servingTime ? "form__input--incomplete" : ''
    const validPriceClass = !fPrice ? "form__input--incomplete" : ''
    const validfPriceClass = !fPrice ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const [imagePath, setImagePath] = useState()



    useEffect(() => {
        setImagePath(`http://localhost:3500/ItemImage/${note.fPicName}`)
    }, [fPicName])



    const content = (
        <>

            <p className={errClass} >{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div>
                    <h2>Edit Item Info #{note.ticket}</h2>


                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteNoteClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <div>

                    {!fPicName ?

                        <NewImage fPicName={fPicName} setfPicName={setfPicName} uploadStatus={uploadStatus} setUploadStatus={setUploadStatus} />
                        :

                        <div style={{ width: "100%", display: "flex", gap: "20px" }}>
                            <img
                                src={imagePath}
                                alt='grid_image'
                                width="80px"
                                height="80px"
                            />
                            <div style={{ display: "flex" }} >
                                Picture Name: {fPicName} &nbsp;

                                <DeleteImage fPicName={fPicName} setfPicName={setfPicName} />
                            </div>

                        </div>


                    }


                </div>
                <div>

                    <label className="form__label form__checkbox-container" htmlFor="fType">
                        Menu Type:</label>
                    <select
                        id="fType"
                        name="fType"
                        className="form__select"
                        value={fType}
                        defaultValue={fType}
                        onChange={onfTypeChanged}
                    >
                        {fOptions}
                    </select>
                </div>
                <div>

                    <label className="form__label" htmlFor="note-title">
                        Item Name:
                    </label>
                    <input
                        className={`form__input ${validTitleClass}`}
                        id="note-title"
                        name="title"
                        type="text"
                        autoComplete="off"
                        value={title}
                        onChange={onTitleChanged}
                    />

                </div>
                <div>
                    <label className="form__label" htmlFor="note-barCode">
                        Bar-Code:</label>
                    <input
                        className={`form__input ${validBarCodeClass}`}
                        id="note-barCode"
                        name="barCode"
                        type="text"
                        autoComplete="off"
                        value={barCode}
                        onChange={onBarCodeChanged}
                    />
                </div>
                <div>
                    <label className="form__label" htmlFor="note-text">
                        Description:</label>
                    <textarea
                        className={`form__input form__input--text ${validTextClass}`}
                        id="note-text"
                        name="text"
                        value={text}
                        onChange={onTextChanged}
                    />
                </div>

                {/* ___________________________ */}
                <div>
                    <label className="form__label" htmlFor="size">
                        Item Size:
                    </label>
                    <select
                        id="size"
                        name="size"
                        className="form__select"
                        value={size}
                        onChange={onSizeChange}
                    >
                        {SOptions}
                    </select>
                </div>

                {(["Breakfast", "Lunch", "Dinner", "lunch&Dinner", "vegetarian", "vegan"].includes(fType))

                    &&
                    <div style={{ display: "flex", gap: "20px" }}>

                        <label className="form__label form__checkbox-container" htmlFor="isSpicy">
                            Is Spicy?:
                            <input
                                className="form__checkbox"
                                id="isSpicy"
                                name="isSpicy"
                                type="checkbox"
                                checked={isSpicy}
                                onChange={onIsSpicyChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="isVegeterian">
                            Is Vegeterian?:
                            <input
                                className="form__checkbox"
                                id="isVegeterian"
                                name="isVegeterian"
                                type="checkbox"
                                checked={isVegeterian}
                                onChange={onIsVegeterianChanged}
                            />
                        </label>
                        <label className="form__label form__checkbox-container" htmlFor="isVegan">
                            Is Vegan?:
                            <input
                                className="form__checkbox"
                                id="isVegan"
                                name="isVegan"
                                type="checkbox"
                                checked={isVegan}
                                onChange={onIsVeganChanged}
                            />
                        </label>

                    </div>

                }







                {/* _________________________________________ */}


                <div>
                    <label className="form__label" htmlFor="servingTime">
                        SERVING TIME ( in min):</label>
                    <input
                        type="number"
                        className={`form__input ${validServingTimeClass}`}
                        id="servingTime"
                        name="servingTime"
                        value={servingTime}
                        onChange={onServingTimeChanged}
                    />
                </div>
                <div>
                    <label className="form__label" htmlFor="notePrice">
                        Item Price:</label>
                    <input
                        type="number"
                        className={`form__input ${validPriceClass}`}
                        id="notePrice"
                        name="fPrice"
                        min={1}
                        max={1000}
                        value={fPrice}
                        onChange={onfPriceChanged}
                    />
                </div>

                <div>
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="note-completed">
                            READY TO POST:
                            <input
                                className="form__checkbox"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            DATA ENTERED BY:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    const content_mod = (
        <>

            <div>
                <h2>Edit Item Info #{note.ticket}</h2>
                <div className="flex justify-between">

                    <div className=" bg-white border rounded-lg overflow-hidden">
                        {!fPicName ?

                            <NewImage fPicName={fPicName} setfPicName={setfPicName} uploadStatus={uploadStatus} setUploadStatus={setUploadStatus} />
                            :

                            <div className="  w-full flex gap-[5px] justify-end">
                                <div className="relative w-[120px] h-[120px]">
                                    <img
                                        src={imagePath}
                                        alt='grid_image'
                                        className="w-full h-full border-4 border-red-100 "
                                    />

                                    <div className="absolute w-full top-1/3 left-1/3 rounded">
                                        <DeleteImage fPicName={fPicName} setfPicName={setfPicName} />
                                    </div>

                                </div>

                            </div>


                        }

                    </div>
                    <div className="block flex-nowrap">
                        <p className="flex text-xs">Created At:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{created}</p>
                        <p className="form__updated text-xs">Updated At:&nbsp;&nbsp;&nbsp;&nbsp;{updated}</p>
                        <p className="form__updated text-xs">Data Entered By:&nbsp;&nbsp;&nbsp;&nbsp;{userId}</p>
                    </div>
                </div>
            </div>

            <p className={errClass} >{errContent}</p>
            {/* <p class="text-red-500 text-xs italic">Please fill out this field.</p> */}

            <form class="w-full" onSubmit={e => e.preventDefault()}>

                <div class="flex flex-wrap -mx-3 my-6 mb-6">

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            Item Type
                        </label>
                        <div class="relative">
                            <select class="block appearance-none w-full bg-gray-200 border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="fType"
                                name="fType"
                                value={fType}
                                defaultValue={fType}
                                onChange={onfTypeChanged}
                            >
                                {fOptions}

                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="note-title">
                            Item Name
                        </label>
                        <input class={`${validTitleClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            id="note-title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}

                        />

                        {/* ++++++++++++++++++++++++++++++++++++++++++++ */}

                    </div>

                    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="note-barCode">
                            Bar Code
                        </label>
                        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="note-barCode"
                            name="barCode"
                            type="text"
                            autoComplete="off"
                            value={barCode}
                            onChange={onBarCodeChanged}
                        />

                    </div>

                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="note-text">
                            Description
                        </label>
                        <textarea
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="note-text"
                            name="text"
                            value={text}
                            onChange={onTextChanged}
                        />

                        <p class="text-gray-600 text-xs italic">
                            We eat with our eyes first, but before we see our food, we picture it while reading the menu descriptions. Hence, please descritp the food very well
                        </p>
                    </div>




                    {/*isSpicy */}

                    <div className="inline-block align-middle w-full my-6 md:w-1/3 px-3 mb-6 md:mb-0">
                        {(["Breakfast", "Lunch", "Dinner", "lunch&Dinner", "vegetarian", "vegan"].includes(fType))

                            &&
                            <>

                                {/* isSpicy */}

                                <label className="w-full items-center align-middle mr-2" htmlFor="isSpicy" id="isSpicy">
                                    Is Spicy?:
                                </label>
                                <input
                                    className="w-[24px] h-[24px] inline-block align-middle"
                                    id="isSpicy"
                                    name="isSpicy"
                                    type="checkbox"
                                    checked={isSpicy}
                                    onChange={onIsSpicyChanged}
                                />

                            </>
                        }
                    </div>
                    {/* is vegetarian */}

                    <div className="inline-block align-middle w-full my-6 md:w-1/3 px-3 mb-6 md:mb-0">

                        {(["Breakfast", "Lunch", "Dinner", "lunch&Dinner", "vegetarian", "vegan"].includes(fType))

                            &&
                            <>
                                {/* isVegeterian */}
                                <label className="w-full items-center align-middle mr-2" htmlFor="isVegeterian">
                                    Is Vegeterian?:
                                </label>
                                <input
                                    className="w-[24px] h-[24px] inline-block align-middle"
                                    id="isVegeterian"
                                    name="isVegeterian"
                                    type="checkbox"
                                    checked={isVegeterian}
                                    onChange={onIsVegeterianChanged}
                                />
                            </>
                        }
                    </div>

                    {/* isvegan */}

                    <div className="inline-block align-middle w-full my-6 md:w-1/3 px-3 mb-6 md:mb-0">

                        {
                            (["Breakfast", "Lunch", "Dinner", "lunch&Dinner", "vegetarian", "vegan"].includes(fType))
                            &&
                            <>
                                <label className="w-full items-center align-middle mr-2" htmlFor="isVegan">
                                    Is Vegan?:
                                </label>
                                <input
                                    className="w-[24px] h-[24px] align-middle"
                                    id="isVegan"
                                    name="isVegan"
                                    type="checkbox"
                                    checked={isVegan}
                                    onChange={onIsVeganChanged}
                                />
                            </>

                        }
                    </div>



                    <hr className=" h-10 text-red-300 w-full my-4" />

                    <div className=" inline-flex align-middle w-full my-6 md:w-1/3 px-3 mb-6 md:mb-0">
                        {/* size */}
                        {
                            (!["Breakfast", "Lunch", "Dinner", "lunch&Dinner", "vegetarian", "vegan"].includes(fType)) === true ?


                                <>

                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="item-size">
                                        Item Size
                                    </label>
                                    <div class="relative inline-flex align-middle ml-5">
                                        <select class="block appearance-none w-full bg-gray-200 border border-gray-600 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="item-size"
                                            name="size"
                                            value={size}
                                            onChange={onSizeChange}
                                        >
                                            {SOptions}
                                        </select>
                                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>

                                </>
                                : <>
                                    {/* servingTime */}

                                    <label class="w-full items-center align-middle"
                                        htmlFor="servingTime">
                                        serving Time ( in min):
                                    </label>
                                    <input
                                        type="text"
                                        className={`${validServingTimeClass} align-middle appearance-none block w-[100px] bg-gray-200 text-gray-700 border border-gray-400 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                        id="servingTime"
                                        name="servingTime"
                                        value={servingTime}
                                        onChange={onServingTimeChanged}
                                    />


                                </>
                        }
                    </div>
                    <div className=" inline-flex align-middle w-full my-6 md:w-1/3 px-3 mb-6 md:mb-0">
                        {/* item Price */}

                        <>

                            <label class="w-full items-center align-middle mr-2 px-3"
                                htmlFor="fPrice">
                                Item Price: ( in $):
                            </label>
                            <input
                                type="text"
                                className={`${validfPriceClass} align-middle appearance-none block w-[100px] bg-gray-200 text-gray-700 border border-gray-400 rounded py-1 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                id="fPrice"
                                name="fPrice"
                                value={fPrice}
                                onChange={onfPriceChanged}
                            />
                        </>
                    </div>


                    {/* ready to post */}

                    <div className="inline-block align-middle w-full my-6 md:w-1/3 px-3 mb-6 md:mb-0">

                        {/* isSpicy */}
                        <div className="align-middle">
                            <label className="w-full items-center align-middle mr-2" htmlFor="note-completed" id="note-completed">
                                Ready To Post?:
                            </label>
                            <input
                                className="form__checkbox w-[24px] h-[24px] align-middle"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </div>
                    </div>

                    <button
                        // type="submit"
                        title="Save"
                        className="inline-block align-middle w-full my-10 ml-1 md:w-[45%] mr-2 mb-6 md:mb-0 justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={onSaveNoteClicked}
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

export default EditNoteForm