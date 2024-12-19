import { Link } from 'react-router-dom'
import { Team } from '../../components/Team/Team'
import Event from '../../components/Event/Event'
import Stats from '../../components/Stats/Stats'

const Welcome = ({ darkMode }) => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section>
            <Stats darkMode={darkMode} />
            <div className=' w-full flex flex-col lg:gap-10 lg:flex-row'>
                <Team />
                <Event />
            </div>
        </section>
    )
    return content
}
export default Welcome