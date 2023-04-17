// import { createContext, useContext, useState } from "react";


// const ModalContext = createContext();

// export const ModalProvider = ({ children }) => {
//     const [modalContent, setModalContent] = useState(false);
//     const [onModalClose, setOnModalClose] = useState(false);

//     const closeModal = () => {
//         setModalContent(false);
//         if (onModalClose) setOnModalClose(true)
//     }

//     return (
//         <ModalContext.Provider value={{ modalContent, onModalClose, closeModal, setModalContent, setOnModalClose }}>
//             {children}
//         </ModalContext.Provider>
//     )

// }

// export const useModal = () => {
//     const context = useContext(ModalContext);

//     if (context === undefined) {
//         throw new Error("useModal has an error")
//     }

//     return context;
// }

import { useState, useContext, createContext } from "react";
import './Modal.css'

const ModalContext = createContext();


export function ModalProvider({ children }) {
    const [modalContent, setModalContent] = useState(null);
    const [onModalClose, setOnModalClose] = useState(null);
    const [render, setRender] = useState(false)

    function closeModal() {
        setModalContent(null); //Sets content back to null when we close
        if (onModalClose) onModalClose();
        setOnModalClose(null) //closes the modal
        // if (onModalClose)
        //     setOnModalClose(null)
    }

    //modal-background needs to be blurry
    //modal just represents the modal
    return (
        <ModalContext.Provider value={{ modalContent, setModalContent, onModalClose, setOnModalClose, closeModal, render, setRender }}>
            {children}
            {modalContent && <div className="modal-background" onClick={closeModal} />}
            {modalContent && <div className="modal">{modalContent}</div>}
        </ModalContext.Provider>
    )
}

export function useModal() {
    return useContext(ModalContext)
}
