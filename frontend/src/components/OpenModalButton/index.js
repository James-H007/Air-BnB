import { useState } from "react"

function OpenModalButton({ buttonText, modalComponent, onButtonClick }) {
    // const [displayModal, setDisplayModal] = useState(false);
    // console.log(onButtonClick)

    // const handleClick = () => {
    //     setDisplayModal(true);
    //     onButtonClick()
    // }

    // const handleClose = () => {
    //     setDisplayModal(false)
    // };

    return (
        <>
            <button onClick={onButtonClick}>{buttonText}</button>
            {(
                <div className="modalBox">
                    {/* <button onClick={onButtonClick}>X</button> */}
                    {modalComponent}
                </div>
            )}
        </>
    )
};

export default OpenModalButton;
