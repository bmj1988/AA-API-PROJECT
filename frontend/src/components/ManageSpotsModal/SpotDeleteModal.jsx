import { useModal } from "../../context/Modal"
import { useDispatch } from "react-redux";
import './ManageSpots.css'
import { thunkSpotDelete } from "../../store/spots";

const SpotDeleteModal = ({spotId}) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const deleteClick = async () => {
        await dispatch(thunkSpotDelete(spotId));
        closeModal();
    }
    return (
        <div className={'deleteContainer'}>
            <h1>Confirm Delete</h1>
            <p>Are you sure you want to remove this spot
                from the listings?</p>
            <button className="deleteButton yes" onClick={() => deleteClick()}>Yes (Delete Spot)</button>
            <button className="deleteButton no" onClick={() => closeModal()}>No (Keep Spot)</button>
        </div>
    )
}
export default SpotDeleteModal
