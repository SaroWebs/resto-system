import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Dialog } from 'primereact/dialog';
import React, { useState } from 'react'

const ListItem = (props) => {
    const { index, item, getItems } = props
    console.log(item);
    return (
        <tr key={index} className='border-b'>
            <td className='text-center px-2'>{index + 1}</td>

            <td className='text-center'>
                <ImageContent items={item.images} />
            </td>
            <td className='text-center'>{item.name}</td>
            <td className='text-center'>{item.price}</td>
            <td className='text-center'>{item.discount}</td>
            <td className='text-center'>{item.category?.name}</td>
            <td className='text-center'>{item.is_available ? 'Available' : 'Unavailable'}</td>
            <td className='text-center'>{item.active ? 'Active' : 'Inactive'}</td>

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

const ImageContent = (props) => {
    const { items = [] } = props;
    let [isOpen, setIsOpen] = useState(false);




    return (
        <>
            <div
                onClick={() => setIsOpen(true)}
                className="cursor-pointer"
            >
                {items.length ?
                    <img className='h-12 my-2 rounded-md ' src={items[0].image_url} alt="img" />
                    : (
                        <div className="flex justify-center items-center text-xs flex-col">
                            <span >No Image</span>
                            <span className='text-red-500'>Click to add image</span>
                        </div>
                    )
                }
            </div>
            <Dialog
                header=""
                visible={isOpen}
                onHide={() => setIsOpen(false)}
                className="bg-white px-4 py-3 rounded-md w-full md:w-1/2 mx-2 md:mx-auto"
            >
                <div>
                    Images List
                    remove|add
                </div>
            </Dialog>
        </>
    );


}