import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import "./spotDelete.css"
import * as spotActions from "../../store/spots"


function SpotDelete({ id }) {

    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const onClose = () => {
        closeModal();
    }

    const handleDelete = async () => {
        await dispatch(spotActions.removeSpot(id))
        await dispatch(spotActions.fetchUserSpots())
        closeModal()
    }

    return (
        <div className='spot-delete-form'>
            <div className='spot-delete-modal'>
                <div className='header-delete'>Confirm Delete</div>
                <div className='disclaimer'>Are you sure you want to remove this spot from the listings?</div>
                <button className='delete-btn1' onClick={handleDelete}>Yes (Delete Spot)</button>
                <button className='delete-btn2' onClick={onClose}>No (Keep Spot)</button>
            </div>

        </div>
    )
}

export default SpotDelete
