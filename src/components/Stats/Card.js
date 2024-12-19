
const Card = ({ data }) => {
    return (
        <div className="bg-white p-4 rounded-2xl flex items-center gap-4 dark:bg-gray-600 dark:text-gray-400">
            <span className={`${data.bgColor} p-3 text-xl rounded-full dark:bg-gray-500`}>
                <data.icon />
            </span>
            <div>
                <h2 className=" text-xl">
                    <span className=" text-2xl font-bold">{data.count}</span>/250
                </h2>
                <p className=" font-bold">{data.title}</p>
            </div>
        </div>
    )
}

export default Card