import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg bg-red-500" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''




    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>



            <form className=" w-full bg-red-400 p-[2em] gap-[0.75em] flex-nowrap m-auto" onSubmit={onSaveUserClicked}>
                <div className=" flex justify-between">
                    <h2>New User</h2>
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
                <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={`form__input ${validUserClass}`}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                />

                <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                />

                <label className="form__label" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`form__select ${validRolesClass}`}
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )



    const content_mod =

        (
            <>
                <p className={errClass}>{error?.data?.message}</p>

                <div className="flex min-h-full flex-1 flex-col justify-center px-3 py-6 lg:px-6">
                    <p className={errClass}>{error?.data?.message}</p>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-4 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                            Add New Admin
                        </h2>
                    </div>

                    <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={onSaveUserClicked}>
                            <div>


                                <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                    Username: <span className="nowrap">[3-20 letters]</span>
                                </label>


                                <div className="mt-2">
                                    <input
                                        className={`block w-full bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${validUserClass}`}
                                        id="username"
                                        name="username"
                                        type="text"
                                        autoComplete="off"
                                        value={username}
                                        onChange={onUsernameChanged}
                                    />
                                </div>









                            </div>

                            <div>


                                {/* _________________________ */}

                                <div className="flex items-center justify-between">
                                    <label className="form__label block text-sm/6 font-medium text-gray-900" htmlFor="password">
                                        Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>

                                </div>

                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={password}
                                        onChange={onPasswordChanged}
                                        className={`block w-full bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${validPwdClass}`}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="form__label block text-sm/6 font-medium text-gray-900" htmlFor="roles">
                                    ASSIGNED ROLES:</label>
                                <select
                                    id="roles"
                                    name="roles"
                                    // className={`form__select ${validRolesClass}`}
                                    className={`block w-full bg-gray-200 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 ${validRolesClass}`}
                                    multiple={true}
                                    size="3"
                                    value={roles}
                                    onChange={onRolesChanged}

                                >
                                    {options}
                                </select>
                            </div>
                            <div>
                                <button
                                    // type="submit"
                                    title="Save"
                                    className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    disabled={!canSave}
                                >
                                    Add Admin

                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </>
        )

    return content_mod
}
export default NewUserForm