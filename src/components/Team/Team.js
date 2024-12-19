import { users } from "../../constants"
import { useGetUsersQuery } from "../../features/users/usersApiSlice"
import Title from "../../Ui/Title"
import Member from "./Member"

export const Team = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })


    let content
    let teamList

    if (isLoading) content = <span style={{ display: "flex" }}>
        {/* <img src={loadingImage} style={{ width: '30px', height: '30px' }} /> &nbsp; */}
        <p>Loading...</p></span>
    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        content =
            <div>
                <Title>Team</Title>

                {ids?.length
                    ? ids.map(userId => <div className=" my-4"> <Member key={userId} userId={userId} /></div>)
                    : null
                }
            </div>

    }


    return content
}
