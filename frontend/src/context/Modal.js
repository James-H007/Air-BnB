import { createContext, useContext, useState } from "react";


const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalContent, setModalContent] = useState(false);
    const [onModalClose, setOnModalClose] = useState(false);

    const closeModal = () => {
        setModalContent(false);
        if (onModalClose) setOnModalClose(true)
    }

    return (
        <ModalContext.Provider value={{ modalContent, onModalClose, closeModal, setModalContent, setOnModalClose }}>
            {children}
        </ModalContext.Provider>
    )

}

export const useModal = () => {
    const context = useContext(ModalContext);

    if (context === undefined) {
        throw new Error("useModal has an error")
    }

    return context;
}
