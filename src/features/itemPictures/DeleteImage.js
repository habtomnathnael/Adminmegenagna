import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDeletePicsMutation } from "./itemApiSlice";
import { faRemove } from "@fortawesome/free-solid-svg-icons";

const DeleteImage = ({ fPicName, setfPicName }) => {

    const [deletePics, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeletePicsMutation()

    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await deletePics({ fPicName: fPicName })
        setfPicName(null)

        // if (uploadStatus === "done") {
        //     clearFileInput();
        //     return;
        // }
        // const id = '12345'
        // fetch("http://localhost:3500/ItemImage", {
        //     method: 'DELETE',
        //     body: { id },

        // })

        //     .then(async (res) => {
        //         let files = await res.json()

        //         console.log(files);
        //         // setfPicName(files.saveImage.filename)
        //     }).catch((err) => {
        //         console.log(err);
        //     });

        // try {
        // setUploadStatus("uploading");

        // const response = await axios.delete(
        //     "http://localhost:3500/ItemImage",
        //     formData,
        // {
        //     onUploadProgress: (progressEvent) => {
        //         const percentCompleted = Math.round(
        //             (progressEvent.loaded * 100) / progressEvent.total
        //         );
        //         setProgress(percentCompleted);
        //     },
        // }
        // )

        // console.log(response)

        // setfPicName(response.data.image.filename);

        // setUploadStatus("done");

        // } catch (error) {
        // setUploadStatus("select");
        // }

    }

    return (
        <button
            onClick={(e) => handleDelete(e)}
            className=" opacity-0 hover:opacity-100 hover:text-white font-bold"
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className=" w-[40px] h-[40px] text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

        </button>
    )
}

export default DeleteImage