import { links } from "../../constants"
import LinkItem from "./LinkItem"
import { useGetReservationsQuery } from '../../features/reservations/reservationApiSlice'


const Sidebar = ({ isSidebarOpen }) => {
    const {
        data: reservations,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetReservationsQuery('reservationList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let count = 0;

    if (isLoading || isError || error) {
        count = 0
    } else {

        const { ids } = reservations

        if (isSuccess) {

            ids?.length && ids.map(noteId => !reservations.entities[noteId].completed ? count = count + 1 : count)

        }

    }


    return (
        <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className=" h-full px-3 pb-4 overflow-y-auto">
                <ul className=" space-y-2 font-medium">
                    {
                        links.map((link, index) => (
                            <>
                                {/* {console.log(link)} */}
                                <LinkItem key={index}{...link} count={count} />
                            </>
                        ))
                    }
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar