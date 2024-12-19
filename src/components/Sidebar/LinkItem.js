import { Link } from 'react-router-dom'
import { useSendLogoutMutation } from "../../features/auth/authApiSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'

const LinkItem = ({ href, icon: Icon, text, badge, subLink, count }) => {


    const navigate = useNavigate()

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


    return (

        <li>
            {
                href !== "/" ?
                    < Link to={href} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Icon className="mr-3" />
                        <span className={`flex-1 me-3`}>{text}</span>

                        {badge &&
                            <span className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full ${badge.color}${badge.darkColor}`}>
                                {text === "Reservations" ? count : badge.text}

                            </span>
                        }
                    </Link>
                    :
                    < div onClick={sendLogout}
                        className=" cursor-pointer flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Icon className="mr-3" />
                        <span className={`flex-1 me-3`}>{text}</span>

                        {badge &&
                            <span className={`inline-flex items-center justify-center px-2 ms-3 text-sm font-medium rounded-full ${badge.color}${badge.darkColor}`}>
                                {badge.text}
                            </span>
                        }
                    </div>
            }

        </li>
    )
}

export default LinkItem