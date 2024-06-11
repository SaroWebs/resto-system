import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const EditItem = (props) => {
    const { category, reload } = props;
    let [isOpen, setIsOpen] = useState(false);
    let [fd, setFd] = useState({ ...category });

    const [image, setImage] = useState(null);
    const [icon, setIcon] = useState(null);
    const [imagePreview, setImagePreview] = useState(category.image_url);
    const [iconPreview, setIconPreview] = useState(category.icon_url);
    const imageInputRef = useRef();
    const iconInputRef = useRef();

    const onImageChange = (event, type = 'image') => {
        const file = event.target.files[0];
        if (type == 'icon') {
            setIcon(file);
        } else if (type == 'image') {
            setImage(file);
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            if (type == 'icon') {
                setIconPreview(reader.result);
            } else if (type == 'image') {
                setImagePreview(reader.result);
            }
        };
        reader.readAsDataURL(file);
    };

    const removePreview = (type) => {
        if (type == 'image') {
            setImage(null);
            setImagePreview(null);
            imageInputRef.current.value = '';
        } else if (type == 'icon') {
            setIcon(null);
            setIconPreview(null);
            iconInputRef.current.value = '';
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.patch(``, fd)
            .then(res => {
                if (res.status == 200) {
                    reload();
                    setIsOpen(false);
                }
            }).catch(err => {
                console.log(err.message);
            });
    }
    return (
        <>
            <button
                className='py-1 px-2 text-xs font-bold bg-pink-600 text-white'
                onClick={() => setIsOpen(true)}
            >
                Edit
            </button>
            <Dialog
                header=""
                visible={isOpen}
                onHide={() => setIsOpen(false)}
                className="bg-white px-4 py-3 rounded-md w-full md:w-3/4 mx-2 md:mx-auto"
            >
                <div>
                    <div className="flex justify-between p-2">
                        <h4 className="text-2xl text-slate-400 capitalize">Edit Category</h4>
                    </div>
                    <hr />
                    <div className="p-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-3">
                                <div className="col-span-2">
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="text"
                                                name="name"
                                                value={fd.name}
                                                onChange={(e) => setFd({ ...fd, name: e.target.value })}
                                                required
                                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                            Description
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                name="description"
                                                value={fd.description}
                                                onChange={(e) => setDescription({ ...fd, description: e.target.value })}
                                                rows="2"
                                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-1 p-4">
                                    <label htmlFor='editimage' className="flex justify-center items-center border border-slate-700 border-dashed rounded-md min-h-[200px]">
                                        {imagePreview ? (
                                            <div id="imagePreview" className="mt-2 relative">
                                                <img src={imagePreview} alt="Image preview" className="w-1/3 h-auto rounded-md" />
                                                <div className="absolute top-2 right-2" onClick={() => removePreview('image')}>
                                                    <IoMdCloseCircleOutline className='w-8 h-8' />
                                                </div>
                                            </div>
                                        ) : "Choose Image"}

                                    </label>
                                    <input hidden type="file" name="image" id="editimage" onChange={(e) => onImageChange(e, 'image')}
                                    ref={imageInputRef}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </Dialog>
        </>
    );
}

export default EditItem