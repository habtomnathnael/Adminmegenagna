import { useParams } from 'react-router-dom'

// import { useSelector } from 'react-redux'
// import { selectUserById } from './usersApiSlice'

import EditUserForm from './EditUserForm'
import loadingImage from '../../img/loadingImage.gif'

import { useGetUsersQuery } from './usersApiSlice'

const EditUser = () => {
    const { id } = useParams()

    // const user = useSelector(state => selectUserById(state, id))

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data?.entities[id]
        })
    })

    if (!user) return <p>Loading...</p>
    const content = <EditUserForm user={user} />
    // const content = user ? <EditUserForm user={user} /> :
    //     <span style={{ display: "flex" }}> <img src={loadingImage} style={{ width: '30px', height: '30px' }} /> &nbsp;<p>Loading...</p></span>

    return content
}
export default EditUser