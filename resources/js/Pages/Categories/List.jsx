import MainLayout from '@/Layouts/MainLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";

const CategoriesList = (props) => {

    let [view, setView] = useState({
        screen: 'list',
        target_id: ''
    });


    return (
        <MainLayout {...props}>
            <Head title="Categories" />
            <div className="container p-4">
                {view.screen == 'list' && <Items {...props} setView={setView} />}
                {view.screen == 'view' && <SingleItem {...props} id={view.target_id} setView={setView} />}
                {view.screen == 'add_new' && <AddNewForm {...props} setView={setView} />}
            </div>
        </MainLayout>
    )
}

export default CategoriesList


const Items = (props) => {
    let [categories, setCategories] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const getCategories = () => {
        setIsLoading(true);
        axios.get(`/api/categories`)
            .then(res => {
                setCategories(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            });
    }
    useEffect(() => {
        getCategories();
    }, []);

    const handleToggle = (id) => {
        let item = categories.data.filter(cat => cat.id == id)[0];
        axios.put(`/category/${id}/updatestatus`, { active: item.active })
            .then(res => {
                getCategories();
            }).catch(err => {
                console.log(err.message);
            })
    }

    return (
        <div className="">
            <div className="flex justify-between p-2 border">
                <h4 className="text-3xl text-slate-400">Categories</h4>
                <button onClick={() => props.setView({ screen: 'add_new', target_id: '' })} className='py-2 px-4 bg-pink-600 text-white'>Add new</button>
            </div>


            <div className="p-2 border">
                <div className="filter py-2"></div>

                {categories && categories.total > 0 ? (
                    <div className="">
                        <table className='w-full border'>
                            <thead>
                                <tr>
                                    <th>sl.</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Icon</th>
                                    <th>Parent</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.data.map((category, i) => (
                                    <tr key={i}>
                                        <td  className='text-center'>{i + 1}</td>
                                        <td  className='flex justify-center items-start'>
                                            <img className='w-16' src={category.image_url} alt="" />
                                        </td>
                                        <td  className='text-center'>{category.name}</td>
                                        <td className='flex justify-center items-start'>
                                            <img className='w-12' src={category.icon_url} alt="" />
                                        </td>
                                        <td className='text-center'>
                                            {category.parent_id ? categories.data.filter(cat => cat.id == category.id)[0].name : ""}
                                        </td>
                                        <td className='flex gap-2 text-sm justify-center items-start'>
                                            <div className="switch">
                                                <Switcher is_active={category.active} handleToggle={() => handleToggle(category.id)} />
                                            </div>
                                            <div className="edit">
                                                <button onClick={() => {
                                                    props.setView({ screen: 'view', target_id: category.id })
                                                }}>View</button>
                                            </div>
                                            <div className="switch">Delete</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pagination py-2"></div>
                    </div>
                ) : (
                    <div className="w-full flex justify-center">
                        <span className="w-full text-center">No category found !</span>
                    </div>
                )}
            </div>

        </div>
    )


}


const Switcher = ({ is_active, handleToggle }) => {
    return (
        <div
            onClick={handleToggle}
            className={`relative w-8 h-4 rounded-full cursor-pointer transition-all duration-300 ${is_active ? 'bg-green-500' : 'bg-red-500'}`}>
            <div className={`absolute h-2 w-2 top-1/2 -translate-y-1/2 rounded-full  ${is_active ? 'bg-green-800 right-1' : 'bg-red-800 left-1'}`}></div>
        </div>
    );
}


const SingleItem = (props) => {
    const { id } = props;
    const [category, setCategory] = useState(null);

    useEffect(() => {
        axios.get(`/api/category/${id}`).then(res => {
            setCategory(res.data);
        }).catch(err => {
            console.log(err.message);
        });
    }, [id])

    if (!category) {
        return (
            <div className="">
                <div className="flex justify-center p-2 border">
                    <span className="text-xs text-red-600">Invalid id</span>
                </div>
            </div>
        );
    }

    return (
        <div className="">
            <div className="flex justify-between p-2 border">
                <h4 className="text-3xl text-slate-400 capitalize">{category.name}</h4>
                <button onClick={() => props.setView({ screen: 'list', target_id: '' })} className='py-2 px-4 bg-pink-600 text-white'>Cancel</button>

            </div>
        </div>
    )

}


const AddNewForm = (props) => {
    let [categories, setCategories] = useState(null);
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

    const getCategories = () => {
        setIsLoading(true);
        axios.get(`/api/categories`)
            .then(res => {
                setCategories(res.data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            });
    }
    useEffect(() => {
        getCategories();
    }, []);

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
            getCategories();
            props.setView({ screen: 'list', target_id: '' })
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="">
            <div className="flex justify-between p-2 border">
                <h4 className="text-3xl text-slate-400 capitalize">Create New</h4>
                <button onClick={() => props.setView({ screen: 'list', target_id: '' })} className='py-2 px-4 bg-pink-600 text-white'>Cancel</button>
            </div>
            <div className="p-2 border">
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
                                rows="3"
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
                                <label htmlFor="parent_id" className="block text-sm font-medium text-gray-700">
                                    Parent ID
                                </label>
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