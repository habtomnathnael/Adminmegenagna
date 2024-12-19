import { GoGoal } from "react-icons/go"
import { GrPlan } from "react-icons/gr"
import { PiSignOutBold } from "react-icons/pi"
import {
    IoIosStats,
    IoIosSettings,
    IoIosPerson,
    IoIosPersonAdd,
    IoIosEyeOff,
    IoIosLogIn,
    IoIosLogOut
} from "react-icons/io"
import {
    FaChartBar,
    FaCalendarAlt,
    FaFacebookMessenger,
    FaUserCog,
    FaListAlt,
    FaShoppingBag,
    FaShoppingCart
} from "react-icons/fa"
import { MdEventAvailable } from "react-icons/md";


import user01 from "../assets/user01.jpg"
import user02 from "../assets/user02.jpg"
import user03 from "../assets/user03.jpg"


export const links = [
    {
        href: "/dash",
        icon: FaChartBar,
        text: "Dashboard"
    },
    {
        href: "/Events",
        icon: MdEventAvailable,
        text: "Events",
        badge: {
            text: "Pro",
            color: "bg-gray-100 text-gray-800",
            darkColor: "dark:bg-gray-700 text-gray-300",
        },
    },
    {
        href: "/dash/notifications",
        icon: FaFacebookMessenger,
        text: "Inbox",
        badge: {
            text: "4",
            color: "bg-blue-100 text-blue-800",
            darkColor: "dark:bg-blue-900 dark:text-blue-300",
        },
    },
    {
        href: "/dash/users",
        icon: FaUserCog,
        text: "Users",
    },
    {
        href: "/dash/notes",
        icon: FaListAlt,
        text: "Products",
    },
    {
        href: "/dash/reservation",
        icon: FaCalendarAlt,
        text: "Reservations",
        badge: {
            text: 9,
            color: "bg-blue-100 text-blue-800",
            darkColor: "dark:bg-blue-900 dark:text-blue-300",
        },
    },
    {
        href: "/dash/orders",
        icon: FaShoppingCart,
        text: "Orders",
        badge: {
            text: 9,
            color: "bg-blue-100 text-blue-800",
            darkColor: "dark:bg-blue-900 dark:text-blue-300",
        },
    },
    {
        href: "/",
        icon: PiSignOutBold,
        text: "Sign Out",
    },

]
export const employeesData = [
    {
        title: "Total Customers",
        icon: IoIosPerson,
        count: 200,
        bgColor: "bg-gray-100",
    },
    {
        title: "occasional",
        icon: IoIosEyeOff,
        count: 15,
        bgColor: "bg-blue-100",
    },
    {
        title: "Frequent",
        icon: IoIosPersonAdd,
        count: 25,
        bgColor: "bg-yellow-100",
    },
];
export const shortcutLink = [
    {
        title: "Goals",
        icon: GoGoal
    },
    {
        title: "Plan",
        icon: GrPlan
    },
    {
        title: "Stats",
        icon: IoIosStats,
    },
    {
        title: "Setting",
        icon: IoIosSettings
    }
];
export const users = [
    {
        name: "Robert Fox",
        country: "USA",
        role: "Python Developer",
        image: user01,
        bgColor: "bg-yellow-100",
    },
    {
        name: "John Smith",
        country: "Canada",
        role: "Backend Developer",
        image: user03,
        bgColor: "bg-blue-100",
    },
    {
        name: "Alice Johnson",
        country: "Australia",
        role: "Full Stack Developer",
        image: user02,
        bgColor: "bg-slate-100",
    },
]

export const events = [
    {
        date: "01 Aug",
        title: "Upcoming Event",
        description: "Lorem ipsum dolor sit amet.."
    },
    {
        date: "15 Sept",
        title: "Networking Meetup",
        description: "Connect with professionals in your field"
    },
    {
        date: "20 Sept",
        title: "Annual Conference",
        description: "Join us for our annual confeerence."
    },
]

// export const options = {
//     series: [44, 55, 41],
//     options: {
//         chart: {
//             type: "donut",
//             height: 350,
//         },
//         labels: ["Desktop", "Tablet", "Mobile"],
//         colors: ["#FF5733", "#33FF57", "#3357FF"],
//         Legend: {
//             position: "bottom",
//             labels: {
//                 colors: darkMode ? "#dddddd" : "#000000",
//             },
//         },
//         dataLabels: {
//             style: {
//                 colors: ["#dddddd"],
//             },
//         },
//         responsive: [
//             {
//                 breakpoint: 400,
//                 options: {
//                     chart: {
//                         width: 200,
//                     },
//                     Legend: {
//                         position: "bottom"
//                     },
//                 },
//             },
//         ],
//     },
// }