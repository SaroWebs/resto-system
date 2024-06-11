import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const AddNewForm = (props) => {
    const { setIsOpen, categories, reload } = props;
    let [isLoading, setIsLoading] = useState(true);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [icon, setIcon] = useState(null);
    const [parentId, setParentId] = useState('');
    const [isRoot, setIsRoot] = useState(false);
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [iconPreview, setIconPreview] = useState(null);
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

    const onSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('icon', icon);
        formData.append('parent_id', parentId);
        formData.append('is_root', isRoot ? 1 : 0);
        formData.append('active', active ? 1 : 0);


        try {
            const response = await axios.post('/category/store', formData);
            setMessage(response.data.message);
            reload();
            setIsOpen(false);
        } catch (error) {
            setMessage(error.response.data.message);
        }

    };

    return (
        <div className="">
            <div className="flex justify-between p-2">
                <h4 className="text-2xl text-slate-400 capitalize">Create New</h4>
            </div>
            <hr />
            <div className="p-2">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="mt-1">
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                required
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <div className="mt-1">
                            <textarea
                                name="description"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                                rows="2"
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 items-start">
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                Image
                            </label>
                            <div className="mt-1">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={(e) => onImageChange(e, 'image')}
                                    ref={imageInputRef}
                                    required
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            {imagePreview && (
                                <div id="imagePreview" className="mt-2 relative">
                                    <img src={imagePreview} alt="Image preview" className="w-1/3 h-auto rounded-md" />
                                    <div className="absolute top-2 right-2" onClick={() => removePreview('image')}>
                                        <IoMdCloseCircleOutline className='w-8 h-8' />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="icon" className="block text-sm font-medium text-gray-700">
                                Icon
                            </label>
                            <div className="mt-1">
                                <input
                                    type="file"
                                    name="icon"
                                    onChange={(e) => onImageChange(e, 'icon')}
                                    ref={iconInputRef}
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            {iconPreview && (
                                <div id="iconPreview" className="mt-2 relative">
                                    <img src={iconPreview} alt="Icon preview" className="w-1/3 h-auto rounded-md" />
                                    <div className="absolute top-2 right-2" onClick={() => removePreview('icon')}>
                                        <IoMdCloseCircleOutline className='w-8 h-8' />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-3  gap-2 items-start">

                        <div>
                            <div className="flex items-center">
                                <input
                                    id="is_root"
                                    name="is_root"
                                    type="checkbox"
                                    checked={isRoot}
                                    onChange={(event) => {
                                        setIsRoot(event.target.checked);
                                    }}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="is_root" className="ml-2 block text-sm font-medium text-gray-700">
                                    Is Root
                                </label>
                            </div>

                        </div>

                        <div>
                            <div className="flex items-center">
                                <input
                                    id="active"
                                    name="active"
                                    type="checkbox"
                                    checked={active}
                                    onChange={(event) => setActive(event.target.checked)}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="active" className="ml-2 block text-sm font-medium text-gray-700">
                                    Active
                                </label>
                            </div>
                        </div>
                        {!isRoot &&
                            <div>
                                <select
                                    name="parent_id"
                                    value={parentId}
                                    onChange={(event) => setParentId(event.target.value)}
                                    className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="">Select a parent category</option>
                                    {categories && categories.data.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                        }
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full p-2 text-lg font-semibold text-white uppercase bg-indigo-500 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-700 focus:ring-indigo-800 active:bg-indigo-800"
                        >
                            Submit
                        </button>
                    </div>

                    {message && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Success!</strong>
                            <span className="block sm:inline">{message}</span>
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}

export default AddNewForm