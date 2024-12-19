import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import loadingImage from '../../img/loadingImage.gif'
// import './style.css';

import usePersist from '../../hooks/usePersist'

const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist, setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const handleToggle = () => setPersist(prev => !prev)

    const errClass = errMsg ? "errmsg bg-red-300" : "offscreen"

    // if (isLoading) return <><img src={loadingImage} style={{ width: '30px', height: '30px' }} />&nbsp;<p>Loading...</p></>

    const content = (
        <section className="bg-red-300">
            <header>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ widows: '30px', height: '30px' }}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    <h1>Admin Login</h1>
                </div>
            </header>
            <main className="login">
                {isLoading && <p>Loading...</p>}
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        className="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>
                    <label htmlFor='persist' className='form__persist'>
                        <input
                            type='checkbox'
                            className='form__checkbox'
                            id='persist'
                            onChange={handleToggle}
                            checked={persist}
                        />
                        Trust This Device
                    </label>

                </form>
            </main>
            <footer>
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                    &nbsp;
                    Back to Home
                </Link>
            </footer>
        </section>
    )


    //  ______________________________________________________________

    const content_mod = (
        <>
            <div class="pt-0 ">
                <div className='flex justify-center items-center h-screen shadow-md bg-gray-300'>
                    <div className=' w-[80%] mx-10 bg-gray-300 grid grid-cols-1  lg:grid-cols-2 lg:divide-x lg:divide-slate-400/[.24]' >
                        <div className='pr-6 px-4 items-center w-auto mt-4 hidden lg:block'>


                            {/* ++==== */}


                            <h1 className=' w-full text-6xl font-bold text-center md:text-5xl md:text-left'>
                                Bring everyone together to build better product
                            </h1>
                            <p className=' mt-4 w-full text-center text-xs text-gray-700 md:text-justify'>
                                We believe in the simple pleasures of life.
                                Good food, fresh ingredients, and awesome vibes. Welcome to Megenagna Mart and Café, make yourself at home.
                                We believe in the simple pleasures of life.
                                Good food, fresh ingredients, and awesome vibes. Welcome to Megenagna Mart and Café, make yourself at home.
                                We believe in the simple pleasures of life.
                                Good food, fresh ingredients, and awesome vibes. Welcome to Megenagna Mart and Café, make yourself at home.
                            </p>
                            {/* <div className=" mt-4 border-solid border-1 border-gray-600 opacity-40"></div> */}

                            {/* +==+++ */}
                        </div>
                        <div className='pl-6 w-auto px-8 shadow-sm '>
                            <h1 className='text-3xl underline block text-center font-semibold'>
                                <span className='mx-auto inline-block align-middle'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=' size-8 inline-block align-middle'>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <Link to="/" className=' align-middleinline-block align-middle'> Login</Link>
                                </span>
                            </h1>

                            <hr className=' text-gray-900 opacity-0' />

                            <p ref={errRef} className={`${errClass}`} aria-live="assertive">&nbsp;{errMsg === "Unauthorized" ? " Wrong username or password" : ""}</p>

                            <div className=''>
                                <label htmlFor="username" className=' block text-base mb-2'>Username</label>
                                <input
                                    type='text'
                                    id='username'
                                    className='border w-full text-base px-2 py-1 focus:ring-o focus:border-gray-600'
                                    placeholder='Enter Username'
                                    ref={userRef}
                                    value={username}
                                    onChange={handleUserInput}
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="password" className='block text-base mb-2'>Password</label>
                                <input
                                    type='password'
                                    id='password'
                                    className='border w-full text-base px-2 py-1 focus:ring-o focus:border-gray-600'
                                    placeholder='Enter Password'
                                    onChange={handlePwdInput}
                                    value={password}
                                    required
                                />
                            </div>

                            <div className='mt-5'>
                                <button className='border-2 border-gray-700 bg-gray-700 text-white py-1 w-full rounded-sm hover:bg-transparent hover:text-indigo-700 font-semibold'
                                    onClick={handleSubmit}
                                > Login</button>

                            </div>

                            <div className=' mt-3 flex justify-between items-center'>
                                <div>
                                    <input
                                        type='checkbox'
                                        id='persist'
                                        onChange={handleToggle}
                                        checked={persist}
                                    />
                                    <label htmlFor='persist'> Trust This Device?</label>
                                </div>

                                <div>
                                    <Link to="/forget" className=' text-indigo-800 font-semibold'>
                                        Forgot Password?</Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </>
    )


    // ____________________________________

    const content_mod_1 = (
        <>
            <div class="pt-3 ">
                <div className='flex justify-center items-center h-screen shadow-md'>
                    <div className=' w-auto grid grid-cols-12 mx-auto'>
                        <div className='col-span-6 hidden md:flex px-6'>
                            <div className=' col-span-6 bg-gray-50 min-h-screen flex items-center justify-center px-16'>
                                <div className=' relative w-full max-w-lg'>
                                    <div className='absolute top-0 -left-4 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'>

                                    </div>
                                    <div className=' absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20'>
                                    </div>
                                    <div className=' absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob'>
                                    </div>
                                    <div className=' m-8 relative space-y-4'>

                                        <div className='p-5 bg-white rounded-lg flex items-center justify-between space-x-8'>
                                            <div className=' flex-1'>
                                                <div className=' h-4 w-48 bg-gray-300 rounded'>
                                                    <p className=' text-gray-400'>
                                                        Megenagna Mart & Cafe
                                                    </p>
                                                </div>
                                            </div>
                                            <div>
                                                <div className=' w-24 h-6 rounded-lg bg-purple-300'></div>
                                            </div>
                                        </div>
                                        <div className='p-5 bg-white rounded-lg flex items-center justify-between space-x-8'>
                                            <div className=' flex-1'>
                                                <div className=' h-4 w-48 bg-gray-300 rounded'>
                                                </div>
                                            </div>
                                            <div>
                                                <div className=' w-24 h-6 rounded-lg bg-purple-300'></div>
                                            </div>
                                        </div>
                                        <div className='p-5 bg-white rounded-lg flex items-center justify-between space-x-8'>
                                            <div className=' flex-1'>
                                                <div className=' h-4 w-48 bg-gray-300 rounded'>
                                                </div>
                                            </div>
                                            <div>
                                                <div className=' w-24 h-6 rounded-lg bg-purple-300'></div>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>



                        </div>
                        <div className=' col-span-12 lg:col-span-6 p-1 lg:p-6 shadow-lg bg-white'>
                            <h1 className='text-3xl block text-center font-semibold'>
                                <span className='mx-auto flex justify-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=' size-8 text-black'>
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>

                                    Login
                                </span>
                            </h1>

                            <hr className='mt-3' />

                            <p ref={errRef} className={`${errClass}`} aria-live="assertive">&nbsp;{errMsg === "Unauthorized" ? " Wrong username or password" : ""}</p>

                            <div className='mt-3'>
                                <label htmlFor="username" className=' block text-base mb-2'>Username</label>
                                <input
                                    type='text'
                                    id='username'
                                    className='border w-full text-base px-2 py-1 focus:ring-o focus:border-gray-600'
                                    placeholder='Enter Username'
                                    ref={userRef}
                                    value={username}
                                    onChange={handleUserInput}
                                    autoComplete="off"
                                    required
                                />
                            </div>

                            <div className='mt-3'>
                                <label htmlFor="password" className='block text-base mb-2'>Password</label>
                                <input
                                    type='password'
                                    id='password'
                                    className='border w-full text-base px-2 py-1 focus:ring-o focus:border-gray-600'
                                    placeholder='Enter Password'
                                    onChange={handlePwdInput}
                                    value={password}
                                    required
                                />
                            </div>

                            <div className='mt-5'>
                                <button className='border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-sm hover:bg-transparent hover:text-indigo-700 font-semibold'
                                    onClick={handleSubmit}
                                > Login</button>

                            </div>

                            <div className=' mt-3 flex justify-between items-center'>
                                <div>
                                    <input
                                        type='checkbox'
                                        id='persist'
                                        onChange={handleToggle}
                                        checked={persist}
                                    />
                                    <label htmlFor='persist'> Trust This Device?</label>
                                </div>

                                <div>
                                    <a href='#' className=' text-indigo-800 font-semibold'>Forgot Password?</a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>


            </div>
        </>
    )

    return content_mod
}
export default Login