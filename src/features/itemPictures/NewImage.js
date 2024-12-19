import React, { useRef, useState } from "react";
import "./upload.css";
import axios from "axios";


const NewImage = ({ fPicName, setfPicName, uploadStatus, setUploadStatus }) => {

    const inputRef = useRef();
    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);
    // const [uploadStatus, setUploadStatus] = useState("select");

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    const clearFileInput = () => {
        inputRef.current.value = "";
        setSelectedFile(null);
        setProgress(0);
        setUploadStatus("select");
    };

    const handleUpload = async () => {
        if (uploadStatus === "done") {
            clearFileInput();
            return;
        }

        try {
            setUploadStatus("uploading");

            const formData = new FormData();

            formData.append("ItemPics", selectedFile);

            const response = await axios.post(
                "http://localhost:3500/ItemImage",
                formData,
                {
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setProgress(percentCompleted);
                    },
                }
            )

            // console.log(response.data.image._id)

            setfPicName(response.data.image._id);

            setUploadStatus("done");

        } catch (error) {
            setUploadStatus("select");
        }

    };

    return (
        <div className="w-auto h-auto">
            <input
                ref={inputRef}
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handleFileChange}
                style={{ display: "none" }}
                className="w-full h-full"
            />

            {/* Button to trigger the file input dialog */}
            {!selectedFile && (
                <>
                    <button className="w-full flex gap-2 mt-10 text-black" onClick={onChooseFile}>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" w-[20px] h-[20px] text-black">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                        </span>
                        <h1>Upload File</h1>
                    </button>
                    <p class="text-gray-800 text-xs">Make sure to select only image file [.jpeg, .jpg, .png]</p>
                </>
            )}

            {selectedFile && (
                <>
                    <div className="file-card">
                        <span className="file_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                            </svg>
                        </span>

                        <div className="file-info">
                            <div style={{ flex: 1 }}>
                                <h6>{uploadStatus === "done" ? fPicName : selectedFile?.name}</h6>

                                <div className="progress-bg">
                                    <div className="progress" style={{ width: `${progress}%` }} />
                                </div>
                            </div>

                            {uploadStatus === "select" ? (
                                <button onClick={clearFileInput} className="file_icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>

                                </button>
                            ) : (
                                <div className="check-circle">
                                    {uploadStatus === "uploading" ? (
                                        `${progress}%`
                                    ) : uploadStatus === "done" ? (
                                        <span
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>

                                        </span>

                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="upload-btn" onClick={handleUpload}>
                        {uploadStatus === "select" || uploadStatus === 'uploading' ? "Upload" : "Done"}
                    </button>
                </>
            )}
        </div>
    );
};

export default NewImage;