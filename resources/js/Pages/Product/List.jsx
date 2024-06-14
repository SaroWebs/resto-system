import MainLayout from '@/Layouts/MainLayout'
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState } from 'react'
import ListItem from './ListItem';

const ProductList = (props) => {
    const [products, setProducts] = useState([]);

    const get_products = () => {
        axios.get('/getproducts')
            .then(res => {
                setProducts(res.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        get_products();
    }, []);





    return (
        <MainLayout {...props}>
            <Head title="Categories" />
            <div className="container p-4">
                <div className="">
                    <div className="flex justify-between p-2 border">
                        <h4 className="text-3xl text-slate-400">Menu Items</h4>
                        <AddNew products={products} reload={get_products} />
                    </div>
                    <div className="p-2 border">
                        <div className="filter py-2"></div>

                        {products && products.total > 0 ? (
                            <div className="">
                                <table className='w-full border p-4'>
                                    <thead>
                                        <tr className='border-b'>
                                            <th className='py-2'>sl.</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Price (Inr)</th>
                                            <th>Discount</th>
                                            <th>Category</th>
                                            <th>Is Available</th>
                                            <th>Status</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody> {products.data.map((item, i) => <ListItem index={i} item={item} getItems={get_products}/> )} </tbody>
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

export default ProductList

const AddNew = (props) => {
    let [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button
                className='py-2 px-4 bg-teal-600 text-white'
                onClick={() => setIsOpen(true)}
            >
                Add New
            </button>
            <Dialog
                header=""
                visible={isOpen}
                onHide={() => setIsOpen(false)}
                className="bg-white px-4 py-3 rounded-md w-full md:w-1/2 mx-2 md:mx-auto"
            >
                <div>
                    Add new menu
                </div>
            </Dialog>
        </>
    );
}