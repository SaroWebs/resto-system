import MainLayout from '@/Layouts/MainLayout';
import { Dialog } from 'primereact/dialog'
import { Head } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
import AddNewForm from './AddNewForm';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import EditItem from './EditItem';

const CategoriesList = (props) => {

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
        <MainLayout {...props}>
            <Head title="Categories" />
            <div className="container p-4">
                <div className="">
                    <div className="flex justify-between p-2 border">
                        <h4 className="text-3xl text-slate-400">Categories</h4>
                        <CreateItem categories={categories} reload={getCategories}/>
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
                                                <td className='text-center'>{i + 1}</td>
                                                <td className='flex justify-center items-start'>
                                                    <img className='w-12' src={category.image_url} alt="" />
                                                </td>
                                                <td className='text-center'>{category.name}</td>
                                                <td className='flex justify-center items-start'>
                                                    <img className='w-8' src={category.icon_url} alt="" />
                                                </td>
                                                <td className='text-center'>
                                                    {category.parent_id ? categories.data.filter(cat => cat.id == category.id)[0].name : ""}
                                                </td>
                                                <td className='flex gap-2 text-sm justify-center items-center py-2'>
                                                    <Switcher is_active={category.active} handleToggle={() => handleToggle(category.id)} />
                                                    <EditItem category={category} reload={getCategories}/>
                                                    <DeleteItem category={category} reload={getCategories}/>
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
            </div>
        </MainLayout>
    )
}

export default CategoriesList




const Switcher = ({ is_active, handleToggle }) => {
    return (
        <div
            onClick={handleToggle}
            className={`relative w-8 h-4 rounded-full cursor-pointer transition-all duration-300 ${is_active ? 'bg-green-500' : 'bg-red-500'}`}>
            <div className={`absolute h-2 w-2 top-1/2 -translate-y-1/2 rounded-full  ${is_active ? 'bg-green-800 right-1' : 'bg-red-800 left-1'}`}></div>
        </div>
    );
}


const CreateItem = (props) => {
    let [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className='py-2 px-4 bg-pink-600 text-white'
                onClick={() => setIsOpen(true)}
            >
                Create
            </button>
            <Dialog
                header=""
                visible={isOpen}
                onHide={() => setIsOpen(false)}
                className="bg-white px-4 py-3 rounded-md w-full md:w-1/2 mx-2 md:mx-auto"
            >
                <AddNewForm {...props} setIsOpen={setIsOpen}/>
            </Dialog>
        </>
    );

}

const DeleteItem = (props) => {


    const accept = () => {
        // 
    };

    const reject = () => {
        // 
    };

    const confirm = (event) => {
        confirmPopup({
            target: event.currentTarget,
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'reject',
            accept,
            reject
        });
    };

    return (
        <>
            <ConfirmPopup className='border p-4 bg-white shadow-md' />
            <div className="flex flex-wrap gap-2 justify-content-center">
                <Button onClick={confirm} icon="pi pi-times" label="Delete" className="p-button-danger"></Button>
            </div>
        </>
    );
}
