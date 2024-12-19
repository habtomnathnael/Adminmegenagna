import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import NewImage from "../itemPictures/NewImage"


const NewNoteForm = ({ users }) => {

    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()


    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [barCode, setBarCode] = useState('')
    const [text, setText] = useState('')
    const [size, setSize] = useState('small')
    const [servingTime, setServingTime] = useState(20)
    const [fPrice, setfPrice] = useState("0.00")
    const [fStars, setfStars] = useState(1)
    const [fType, setfType] = useState("Breakfast")
    const [fPics, setfPics] = useState("")
    const [fPicName, setfPicName] = useState(null)
    const [isSpicy, setIsSpicy] = useState(false)
    const [isVegeterian, setIsVegeterian] = useState(false)
    const [isVegan, setIsVegan] = useState(false)

    const [uploadStatus, setUploadStatus] = useState("select");

    const [userId, setUserId] = useState(users[0].id)
    // ____________________________________
    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    // __________________________________________
    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            // fPics("")
            setfPicName(null)
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate, fPicName])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    // const onColorChange = e => setColor(e.target.value)
    const onSizeChange = e => setSize(e.target.value)
    const onServingTimeChanged = e => setServingTime(e.target.value)
    const onfPriceChanged = e => setfPrice(e.target.value)

    const onfStarsChanged = e => setfStars(e.target.value)

    const onUserIdChanged = e => setUserId(e.target.value)

    const onfTypeChanged = e => setfType(e.target.value)

    const onBarCodeChanged = e => setBarCode(e.target.value)

    const onIsSpicyChanged = e => setIsSpicy(prev => !prev)

    const onIsVegeterianChanged = e => setIsVegeterian(prev => !prev)

    const onIsVeganChanged = e => setIsVegan(prev => !prev)



    const canSave = [title, text, userId, uploadStatus === "done"].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {

        e.preventDefault()

        if (canSave && uploadStatus === "done") {
            // console.log({ user: userId, title, text, servingTime, fPrice, fOptions })
            await addNewNote({ user: userId, title, barCode, text, size, servingTime, fPrice, fType, fPicName, isSpicy, isVegeterian, isVegan })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const fOptions = ["Breakfast", "Lunch", "Dinner", "lunch&Dinner", "vegetarian", "vegan", "drinks", "spices", "cloth", "grocery", "others"].map((val, ind) => {
        return (
            <option
                key={ind}
                value={val}
            > {val}</option >
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



    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validBarCodeClass = !barCode ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''
    // const validColorClass = !color ? "form__input--incomplete" : ''
    const validSizeClass = !size ? "form__input--incomplete" : ''
    const validfPriceClass = !fPrice ? "form__input--incomplete" : ''
    const validServingTimeClass = !servingTime ? "form__input--incomplete" : ''
    const validfStarsClass = !fStars ? "form__input--incomplete" : ''
    // const validIsSpicyclassName=!isSpicy?"form__input--incomplete":""
    // const validIsVegeterianClass = !isVegeterian?"form__input--incomplete":""
    // const validIsVeganClass = !isVegan?"form__input--incomplete":""


    const handleFileUpload = async () => {

        const formData = new FormData()

        formData.append("ItemPics", fPics)

        fetch("http://localhost:3500/ItemImage", {
            method: 'POST',
            body: formData,
        }).then(async (res) => {
            let files = await res.json()
            // console.log(files.saveImage);
            setfPicName(files.saveImage.filename)
        }).catch((err) => {
            console.log(err);
        });


        // const file = e.target.files[0];
        // const base64 = await convertToBase64(file)
        // setfPics({ ...fPics, myFile: base64 })
        // return console.log(fPics)
    }

    const content = (
        <>

            <form className="form" onSubmit={onSaveNoteClicked} style={{ paddingTop: "50px" }}>

                <div style={{ display: "flex", gap: "100px" }}>
                    <h2>Add new Item</h2>
                    <div className="form__title-row" style={{ alignItems: "right" }}>

                        <div className="form__action-buttons">
                            <button
                                className="icon-button"
                                title="Save"
                                disabled={!canSave}
                            >
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                        </div>
                    </div>
                </div>

                <p className={errClass}>{error?.data?.message}</p>

                <NewImage fPicName={fPicName} setfPicName={setfPicName} uploadStatus={uploadStatus} setUploadStatus={setUploadStatus} />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                        <label className="form__label form__checkbox-container" htmlFor="username">
                            Menu Type:</label>
                        <select
                            id="fType"
                            name="fType"
                            className="form__select"
                            value={fType}
                            onChange={onfTypeChanged}
                        >
                            {fOptions}
                        </select>
                    </div>

                </div>


                <label className="form__label" htmlFor="barCode">
                    BarCode:</label>
                <input
                    className={`form__input ${validBarCodeClass}`}
                    id="barCode"
                    name="barCode"
                    type="text"
                    autoComplete="off"
                    value={barCode}
                    onChange={onBarCodeChanged}
                />

                <label className="form__label" htmlFor="title">
                    Item Name:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="text">
                    Description:</label>

                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />



                {/* _________________________ */}

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



                {/* ________________________________________ */}




                {/* ___________________________ */}


                {
                    (!["Breakfast", "Lunch", "Dinner", "lunch&Dinner", "vegetarian", "vegan"].includes(fType))
                    &&
                    <>
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
                    </>
                }


                {/* _________________________________________ */}
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


                <label className="form__label" htmlFor="fPrice">
                    Item Price:</label>
                <input
                    type="text"
                    className={`form__input ${validfPriceClass}`}
                    id="fPrice"
                    name="fPrice"
                    value={fPrice}
                    onChange={onfPriceChanged}
                />


                <label className="form__label" htmlFor="fStars">
                    Stars:</label>
                <input
                    type="number"
                    className={`form__input ${validfStarsClass}`}
                    id="fStars"
                    name="fStars"
                    value={fStars}
                    min={1}
                    max={5}
                    onChange={onfStarsChanged}
                />
                <label className="form__label form__checkbox-container" htmlFor="username">
                    DATA ENTERED BY:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>

        </>
    )


    const content_mod = (
        <>

            <div>
                <h2>Add new Item</h2>
                <div className="flex justify-between">

                    <div className=" bg-white border rounded-lg overflow-hidden">
                        <NewImage fPicName={fPicName} setfPicName={setfPicName} uploadStatus={uploadStatus} setUploadStatus={setUploadStatus} />
                    </div>
                    <div>something to display</div>
                </div>
            </div>

            <p className={errClass}>{error?.data?.message}</p>
            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}

            <form className="w-full" onSubmit={e => e.preventDefault()}>

                <div className="flex flex-wrap -mx-3 my-6 mb-6">

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                            Item Type
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="fType"
                                name="fType"
                                value={fType}
                                defaultValue={fType}
                                onChange={onfTypeChanged}
                            >
                                {fOptions}

                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            for="note-title">
                            Item Name
                        </label>
                        <input className={`${validTitleClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`}
                            id="note-title"
                            name="title"
                            type="text"
                            autoComplete="off"
                            value={title}
                            onChange={onTitleChanged}

                        />

                        {/* ++++++++++++++++++++++++++++++++++++++++++++ */}

                    </div>

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="note-barCode">
                            Bar Code
                        </label>
                        <input className={`${validBarCodeClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                            id="note-barCode"
                            name="barCode"
                            type="text"
                            autoComplete="off"
                            value={barCode}
                            onChange={onBarCodeChanged}
                        />

                    </div>

                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="note-text">
                            Description
                        </label>
                        <textarea
                            className={`${validTextClass} appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                            id="note-text"
                            name="text"
                            value={text}
                            onChange={onTextChanged}
                        />

                        <p className="text-gray-600 text-xs italic">
                            We eat with our eyes first, but before we see our food, we picture it while reading the menu descriptions. Hence, please descritp the food very well</p>
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

                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="item-size">
                                        Item Size
                                    </label>
                                    <div className="relative inline-flex align-middle ml-5">
                                        <select className="block appearance-none w-full bg-gray-200 border border-gray-600 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                            id="item-size"
                                            name="size"
                                            value={size}
                                            onChange={onSizeChange}
                                        >
                                            {SOptions}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div>

                                </>
                                : <>
                                    {/* servingTime */}

                                    <label className="w-full items-center align-middle"
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

                            <label className="w-full items-center align-middle mr-2 px-3"
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

                    {/* <div className="inline-block align-middle w-full my-6 md:w-1/3 px-3 mb-6 md:mb-0"> */}

                    {/* isSpicy */}
                    {/* <div className="align-middle">
                            <label
                                className="w-full items-center align-middle mr-2"
                                htmlFor="isSpicy"
                                id="note-completed"
                            >
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
                        </div> */}
                    {/* </div> */}

                    {/* ____________________________________ */}

                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="username"
                            id="username"
                        >
                            DATA ENTERED BY:
                        </label>
                        <div className="relative">
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="username"
                                name="username"
                                value={userId}
                                // defaultValue={userId}
                                onChange={onUserIdChanged}
                            >
                                {options}

                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>















                    {/* _______________________________________________ */}



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
                    // onClick={onDeleteNoteClicked}
                    >
                        Delete

                    </button>




                </div>

            </form>
        </>
    )




    return content_mod
}

export default NewNoteForm