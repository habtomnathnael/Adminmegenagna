import React, { useEffect, useRef, useState } from "react";
import "./upload.css";
import axios from "axios";
import GridImage from "./GridImage";

const ImageList = () => {
    const [loading, setLoading] = useState(false)
    const [allImage, setAllImage] = useState([])

    useEffect(() => {
        setLoading(true)
        axios.get("http://localhost:3500/ItemImage")
            .then((res) => {
                setAllImage(res.data)
                loading(false)
            }).catch((err) => console.log(err))
    }, [])

    return (
        <>

            <GridImage allImage={allImage} />
        </>
    )
}

export default ImageList