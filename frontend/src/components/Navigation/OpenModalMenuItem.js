// frontend/src/components/Navigation/OpenModalMenuItem.js
import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalMenuItem({
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
}) {
    const { setModalContent, setOnModalClose } = useModal();

    const onClick = () => {

        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
        if (onItemClick) onItemClick();
        // console.log("Open Modal Menu Item has been clicked")
        // console.log("itemText", itemText)
        // console.log('OnItemClick', onItemClick)
        // console.log("On modal Close", onModalClose)
    };

    return (
        <li onClick={onClick}>{itemText}</li>
    );
}

export default OpenModalMenuItem;
