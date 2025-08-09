import React, { useRef, useState } from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu"

const ProfilePhotoSelector = ({ image, setImage }) => {

    // inputRef will be used to directly access or control a DOM element — like an <input> field — without re-rendering the component.
    const inputRef = useRef(null);

    const [previewUrl, setPreviewUrl] = useState(null)

    const handleImageChanges = (event) => {
        const file = event.target.files[0];
        // event.target	The <input type="file"> element
        // event.target.files	The list of uploaded files
        // event.target.files[0]	The first file selected

        if (file) {
            // updates the setProfilePic state ultimately
            setImage(file);

            // URL.createObjectURL(file) Creates a temporary URL to access the selected file (like an image) locally, without uploading it.
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview)
        }
    }

    const handleRemoveImage = () => {
        setImage(null)
        setPreviewUrl(null)
    }

    const onChooseFile = () => {
        // inputRef is a ref attached to the <input type="file"> element.
        // inputRef.current refers to that input DOM element.
        // .click() programmatically clicks the input, opening the file dialog.
        inputRef.current.click()
    }

    return (
        <div className='flex justify-center mb-6'>
            <input className='hidden' type="file" accept='image/' ref={inputRef} onChange={handleImageChanges} />

            {!image ? (
                <div className='h-20 w-20 flex items-center justify-center bg-purple-100 rounded-full  cursor-pointer relative' onClick={onChooseFile}>
                    <LuUser className='text-4xl text-primary' />
                    <button className='w-8 h-8 text-xl flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1  cursor-pointer' type='button'>
                        <LuUpload />
                    </button>
                </div>
            ) : (
                <div className='relative'>
                    <img className='w-20 h-20 rounded-full object-cover' src={previewUrl} alt="" />
                    <button className='w-8 h-8 text-xl flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer' type='button' onClick={handleRemoveImage}>
                        <LuTrash />
                    </button>
                </div>
            )
            }
        </div>
    )
}

export default ProfilePhotoSelector