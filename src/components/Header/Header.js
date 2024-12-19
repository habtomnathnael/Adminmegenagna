import { FaMoon, FaSun } from "react-icons/fa"
import { HiOutlineMenuAlt2 } from "react-icons/hi"
import { MdSpaceDashboard } from "react-icons/md"

import { useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from "../../features/auth/authApiSlice"

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/


const Header = ({ darkMode, toggleDarkMode,
    toggleSidebar
}) => {

    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])


    if (isLoading) return <p>Logging Out...</p>

    if (isError) return <p>Error: {error.data?.message}</p>

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "max-w-[100%] flex-row flex-nowrap justify-between align-middle items-center"
    }

    const logoutButton = (
        <button
            className=" size-[1.5rem] w-[30px] h-[30px] bg-transparent border-none grid items-center hover:transform: scale-[1.2] disabled:hidden"
            title="Logout"
            onClick={sendLogout}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
            </svg>

        </button>
    )



    return (
        <>
            <div className=" fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className=" px-3 py-3 lg:px-5 lg:pl-3">
                    <div className=" flex items-center justify-between">
                        <div className=" flex items-center justify-start rtl:justify-end">
                            <button className="inline-flex items-center p-2 text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                onClick={toggleSidebar}
                            >
                                <HiOutlineMenuAlt2 className=" text-2xl" />
                            </button>
                            <a href="#" className=" flex ms-2 md:me-24">
                                <MdSpaceDashboard className="h-8 me-3 text-xl text-violet-500" />
                                <span className=" self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    <Link to="/dash">
                                        MegEnaGna
                                    </Link>
                                </span>
                            </a>
                        </div>
                        <button className=" dark:bg-slate-50 dark:text-slate-700 rounded-full p-2"
                            onClick={toggleDarkMode}>
                            {darkMode ? <FaSun /> :
                                // <FaMoon />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" text-gray-700 size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                </svg>

                            }
                        </button>

                        {/* <div>
                            {logoutButton}
                        </div> */}

                    </div>

                </div>
            </div>
        </>
    )
}

export default Header