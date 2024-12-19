import userLogo from '../../assets/user01.jpg'

const User = () => {
    return (
        <div className='flex gap-3 mb-2 items-center bg-white p-4 rounded-sm dark:bg-gray-600 dark:text-gray-300'>
            <img src={userLogo} alt='user image' className='w-14 h-14 rounded-full' />
            <div>
                <h3 className='font-semibold text-2xl'>John Doe</h3>
                <p>Developer</p>
            </div>

        </div>
    )
}

export default User