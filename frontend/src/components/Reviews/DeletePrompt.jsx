import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/reviews";

const DeletePrompt = ({review}) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const deleteReview = async (e) => {
        e.preventDefault();
        await dispatch(thunkDeleteReview(review))
        closeModal();
    }

    return (
        <div className='deletePrompt'>
            <h1>Delete Review</h1>
            <div style={{background: 'white', padding:'10px'}}>
            <h3 className='textmark'>Are you sure you want to delete this review?</h3>
            <button className='deleteButton yes' autoFocus onClick={(e) => deleteReview(e)}>{'Yes, (Delete Review)'}</button>
            <button className='deleteButton no' onClick={() => closeModal()}>{'No, (Keep Review)'}</button>
            </div>
        </div>
    )
}
export default DeletePrompt;
