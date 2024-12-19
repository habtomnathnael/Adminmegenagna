
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import { useAddNewOrderMutation } from "./OrderApiSlice"


function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
function validatePhone(phone) {
    const phonePattern = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
    var digits = phone.replace(/\D/g, "");
    return phonePattern.test(digits)
}

const NewOrderForm = () => {

    const [addNewOrder, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewOrderMutation()

    const navigate = useNavigate()

    const [userInfo, setUserInfo] = useState({})

    const [orders, setOrders] = useState([])

    const [deliveryInfo, setDeliveryInfo] = useState({})

    const [description, setDescription] = useState("")


    // {
    //     "userInfo":
    //     {
    //         "firstName": "nathnaelY",
    //             "lastName": "habtom",
    //                 "email": "nathnael@gmail.com",
    //                     "phone": "5606060065"
    //     },
    //     "status": {
    //         "status": "preorder"
    //     },
    //     "orders":
    //     [
    //         {
    //             "barCode": "0000",
    //             "Price":
    //             {
    //                 "singlePrice": "60",
    //                 "amount": "6",
    //                 "totalPrice": "50"
    //             }
    //         },
    //         {
    //             "barCode": "0010",
    //             "Price":
    //             {
    //                 "singlePrice": "30",
    //                 "amount": "70",
    //                 "totalPrice": "210"
    //             }
    //         }
    //     ],
    //         "deliveryInfo":
    //     {
    //         "deliveryType": "6.56",
    //             "deliveryAddress":

    //         {
    //             "streetAdress": "565 esters rd",
    //                 "city": "irving",
    //                     "state": "TX",
    //                         "zipCode": "66666",
    //                             "country": "usa"
    //         }

    //     }
    // }


    useEffect(() => {
        if (isSuccess) {
            userInfo({})
            orders({})
            deliveryInfo({})
            description('')
            navigate('/dash/reservation')
        }

    }, [isSuccess, navigate])

    return (
        <div>NewOrderForm</div>
    )
}

export default NewOrderForm