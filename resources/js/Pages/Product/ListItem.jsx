import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import React from 'react'

const ListItem = (props) => {
    const { index, item , getItems} = props
    console.log(item);
    return (
        <tr key={index} className='border-b'>
            <td className='text-center px-2'>{index + 1}</td>

            <td className='text-center'>
                {
                    item.images.length ? (
                        <img className='h-12 my-2 rounded-md ' src={item.images[0].image_url} alt="img" />
                    ): 'image nai'
                }
            </td>
            <td className='text-center'>{item.name}</td>
            <td className='text-center'>{item.price}</td>
            <td className='text-center'>{item.discount}</td>
            <td className='text-center'>{item.category?.name}</td>
            <td className='text-center'>{item.is_available ? 'Available':'Unavailable'}</td>
            <td className='text-center'>{item.active ? 'Active':'Inactive'}</td>

            <td className='flex gap-2 text-sm justify-center items-center py-2'>
                {/* <EditItem item={item} reload={getCategories} /> */}
                <DeleteItem item={item} reload={getItems} />
            </td>
        </tr>
    )
}

export default ListItem

const DeleteItem = (props) => {
    const { item, reload } = props;
    const removeItem = () => {
        axios.delete(`/product/${item.id}`)
            .then(res => {
                reload();
                console.log(res);
            }).catch(err => {
                console.log(err.message);
            })
    }


    const accept = () => {
        removeItem();
    };

    const reject = () => { };

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
