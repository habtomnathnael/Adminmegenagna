import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { selectNoteById } from './notesApiSlice'
// import { selectAllUsers } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'
import loadingImage from '../../img/loadingImage.gif'

import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'


import Loading from '../../config/Loading'

const EditNote = () => {
    const { id } = useParams()



    // const note = useSelector(state => selectNoteById(state, id))
    // const users = useSelector(selectAllUsers)

    // const { username, isManager, isAdmin } = useAuth()


    const { note } = useGetNotesQuery("notesList", {
        selectFromResult: ({ data }) => ({
            note: data?.entities[id]
        })
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        })
    })


    if (!note || !users?.length) return <p>Loading...</p>

    // if (note.username !== username) {
    //     return <p className='errmsg'>No access</p>
    // }

    const content = <EditNoteForm note={note} users={users} />
    // const content = note && users ? <EditNoteForm note={note} users={users} /> :
    //     <span style={{ display: "flex" }}> <img src={loadingImage} style={{ width: '30px', height: '30px' }} /> &nbsp;<p>Loading...</p></span>
    // // <Loading />

    return content
}
export default EditNote