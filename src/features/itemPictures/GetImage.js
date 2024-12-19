import React, { useEffect, useRef, useState } from "react";
import "./upload.css";
import axios from "axios";

const getImage = () => {
    const [image, setImage] = useState(null)
    const [allImage, setAllImage] = useState(null)

    useEffect(() => {
        getImages();
    }, [])

    const getImages = async () => {
        const result = await axios.get("http://localhost:3500/ItemImage");
        // console.log(result)
        setAllImage(result.data.data)
    }

    return (
        <>
        </>
    )

}
