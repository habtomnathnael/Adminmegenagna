import { Detector } from 'react-detect-offline'
import { CiWifiOff } from "react-icons/ci";

const CheckConnection = (props) => {
    return (
        <>
            <Detector
                render={({ online }) => (
                    online ? props.children :
                        <div className='mt-[25vh] align-middle text-center'>
                            <div className='mx-auto text-xl'>
                                <CiWifiOff className=' text-5xl mx-auto' />
                            </div>
                            <div className=' block text-2xl items-center'>
                                <h1 className=' mx-auto top-[5px]'> No Connection</h1>
                                <h4 className=' mx-auto '>Please check your internet connection</h4>
                            </div>
                        </div>
                )}
            />
        </>
    )
}

export default CheckConnection