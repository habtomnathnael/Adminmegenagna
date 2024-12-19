import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

// import { useSelector } from 'react-redux'
// import { selectNoteById } from './notesApiSlice'

import { useGetNotesQuery } from './notesApiSlice'
import { memo } from 'react'

const Note = ({ noteId }) => {

    // const note = useSelector(state => selectNoteById(state, noteId))

    //different way of getting note from the backend
    const { note } = useGetNotesQuery('notesList', {
        selectFromResult: ({ data }) => ({
            note: data?.entities[noteId]
        })
    })

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)
        const cellStatus = note.completed ? '' : 'bg-gray-100'


        // const ItemType = ["Breakfast", "Lunch", "Dinner", "lunch&Dinner", "vegetarian", "vegan", "drinks", "spices", "cloth", "grocery", "others"]

        return (
            // <tr className="table__row">

            //     <td className="table__cell note__status">
            //         {note.completed
            //             ? <span className="note__status--completed">
            //                 Yes

            //             </span>
            //             : <span className="note__status--open">
            //                 No
            //             </span>
            //         }
            //     </td>
            //     {/* <td className="table__cell note__title">{note.title}</td> */}
            //     <td className="table__cell note__created">{created}</td>
            //     <td className="table__cell note__updated">{updated}</td>
            //     <td className="table__cell note__title">{note.title}</td>
            //     <td className="table__cell note__username">{note.username}</td>

            //     <td className="table__cell">
            //         <button
            //             className="icon-button table__button"
            //             onClick={handleEdit}
            //         >
            //             <FontAwesomeIcon icon={faPenToSquare} />
            //         </button>
            //     </td>
            // </tr>

            // _________________________________________________

            <tr key={note.email}>
                <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>
                    <span className={`inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium ${note.completed ? "text-green-700 ring-1 ring-inset ring-green-600/20" : "text-red-700 ring-1 ring-inset ring-red-600/20"}`}>
                        {note.completed ? "Yes" : "No"}
                    </span>
                </td>
                <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>
                    <div className="text-gray-900">Bar Code: &nbsp;{note.barCode}</div>
                    <div className="text-gray-900">{note.title}</div>

                    <div className=' w-[300px] truncate'>{note.text}</div>
                </td>

                <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500`}>
                    {
                        <div className="text-gray-900">{note.color !== "" && note.color | (note.size !== "") && note.size}</div>
                    }
                </td>
                <td className={`${cellStatus} whitespace-nowrap px-3 py-5 text-sm text-gray-500 `}>
                    <div className="text-gray-900">{note.fType}</div>
                    <div className="text-gray-900">$&nbsp;{note.fPrice}</div>

                </td>

                <td className={`${cellStatus} relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0`}>
                    <a href="#" className="text-indigo-600 hover:text-indigo-900"
                        onClick={handleEdit}
                    >
                        Edit
                        {/* <span className="sr-only">{user.username}</span> */}
                    </a>
                </td>
            </tr>



            // _________________________________________________________


        )

    } else return null
}

const memoizedNote = memo(Note)


export default memoizedNote