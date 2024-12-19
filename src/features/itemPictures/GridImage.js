import React from 'react'

const GridImage = ({ allImage }) => {


    return (
        <>
            <div className='grid'>
                {
                    allImage.length ?
                        allImage.map((item, index) => (
                            <>
                                <div>Our Gallary</div>
                                <div key={index} className='grid__item'>
                                    <img
                                        src={`https://megenagna-api.onrender.com/ItemImage/${item._id}`}
                                        alt='grid_image'
                                    />
                                </div>
                            </>
                        )) :
                        <>No item pictures to display</>
                }
            </div>
        </>
    )
}

export default GridImage
