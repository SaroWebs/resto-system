import MainLayout from '@/Layouts/MainLayout'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ProductList = (props) => {
    const [products, setProducts] = useState([]);

    const get_products = () => {
        axios.get('/api/getproducts')
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

    useEffect(() => {
        if (products) {
            console.log(products);
        }
    }, [products]);



    return (
        <MainLayout {...props}>
            1. add new button
            2. list table

            Products
        </MainLayout>
    )
}

export default ProductList
