import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import Main from '../Ui/Main'
import Content from '../Ui/Content'
import Profile from './Profile/Profile'
import Footer from './Footer/Footer'
import CommonP from './commonPallettee/CommonP'

const DashLayout = () => {
    const [darkMode, setDarkMode] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <>
            <div className={`${darkMode && "dark"} font-quickSand`}>

                <Header toggleDarkMode={toggleDarkMode}
                    darkMode={darkMode}
                    toggleSidebar={toggleSidebar}
                />
                <Sidebar isSidebarOpen={isSidebarOpen} />
                <Main>
                    <Content>
                        <Outlet />
                    </Content>
                    {/* <Profile /> */}
                </Main>
                <Footer />
            </div>

        </>
    )
}
export default DashLayout