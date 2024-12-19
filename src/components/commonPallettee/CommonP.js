import React, { useState } from 'react'

const CommonP = () => {
    const [isCommonOpen, setIsCommonOpen] = useState(true)
    return (
        isCommonOpen &&
        <div className='fixed inset-0 overflow-y-auto p-4 pt-[25vh]'

            onClick={() => setIsCommonOpen(!isCommonOpen)}
        >
            <div className=' fixed inset-0 bg-gray-500/75'>
                <div className=' relative mx-auto max-w-xl bg-white'>
                    <p className=' py-4 text-center text-purple-900'>
                        Let us build a command pallette!
                    </p>
                </div>
            </div>
        </div>

    )
}

export default CommonP