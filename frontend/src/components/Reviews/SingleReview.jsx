import { useDispatch, useSelector } from 'react-redux'
import './Reviews.css'
import { useState } from 'react'
import { thunkDeleteReview } from '../../store/reviews';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeletePrompt from './DeletePrompt';
import { useModal } from '../../context/Modal';

const SingleReview = ({ review, userReviews }) => {
    const {modalView} = useModal();
    const dispatch = useDispatch();
    const [deletePrompt, setDeletePrompt] = useState(false)
    const date = new Date(review.createdAt)
    const month = date.toLocaleString('default', {month: "long"})
    const toPublicDate = `${date.getDate()}, ${month}, ${date.getFullYear()}`
    let currentUser = useSelector((state) => state.session.user)
    if (!currentUser) currentUser = {id:0}

    const deleteReview = async (e) => {
        e.preventDefault();
        const msg = await dispatch(thunkDeleteReview(review))
        setDeletePrompt(false)
        alert(msg)
    }
    const displayText = userReviews && review ? review.Spot.name : review.User.firstName
    return (
        <div className='singleReview'>
            <h3>{displayText}</h3>
            <h4>{toPublicDate}</h4>
            <div style={{display: 'flex', width: '800px', justifyContent:'space-between', flexWrap: 'wrap'}}><p className={"reviewText"}>{review.review}</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <i style={{color:"#1bcdd0"}} className="fa-solid fa-star" />
            <p className="starRating">{review.stars}</p>
            </div>
            </div>
            {(review.User.id === currentUser.id && modalView) && <button onClick={() => setDeletePrompt(true)}>Delete</button>}
            {(review.User.id === currentUser.id && !modalView) && <OpenModalButton modalComponent={<DeletePrompt review={review}/>} buttonText={'Delete'}/>}
            {deletePrompt && <div>
                <h3 className='textmark'>Are you sure you want to delete this review?</h3>
                <button className='deleteButton yes' autoFocus onClick={(e) => deleteReview(e)}>{'Yes, (Delete Review)'}</button>
                <button className='deleteButton no' onClick={() => setDeletePrompt(false)}>{'No, (Keep Review)'}</button>
                </div>}
        </div>
    )
}
export default SingleReview;
