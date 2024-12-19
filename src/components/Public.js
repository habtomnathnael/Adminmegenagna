import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Megenagna mart and Cafe API !</span></h1>
            </header>
            <main className="public__main">
                <p>We welcome you to a fresh, testy delicious and traditional inspired Ethiopian dishes in our Mart and Cafe. From breakfast to dinner, we are waiting to serve you with excellence.</p>
                <address className="public__addr">
                    <br />
                    2013 Wells Branch Pkwy<br />
                    Austin, TX 78728<br />
                    <a href="tel:+15122917281">(512) 291-7281</a>
                </address>
                <br />
                <p>Owner: Markan Logistics LLC</p>
            </main>
            <footer>
                <Link to="/login">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style={{ width: "20px", height: "20px" }}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                    </svg>
                    &nbsp;
                    Admin Login
                </Link>
            </footer>
        </section>

    )
    return content
}
export default Public