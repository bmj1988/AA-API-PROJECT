import { useState } from "react"
import { thunkAddReview } from "../../store/reviews"
import { useDispatch } from "react-redux"
import './Reviews.css'
import { useModal } from "../../context/Modal"

const ReviewFormModal = ({ spotId, userId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [activeRating, setActiveRating] = useState(0)
    const [errors, setErrors] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = {
            userId,
            spotId,
            review,
            stars: rating,
        }
        const responseReview = await dispatch(thunkAddReview(newReview))
        if (!responseReview.errors) {
            closeModal();
        }
        else {
            setErrors(responseReview.errors)
            return
        }
    }
    return (
        <div className="reviewFormModal">
            <h1>Review</h1>
            <form onSubmit={(e) => handleSubmit(e)} className="formDiv">
                {errors && <p className="errors">{errors}</p>}
                <h5 className="textmark">How was your stay?</h5>
                {errors && errors.map((error) => {
                    return (
                        <p key={error} className="errors">{error.msg}</p>
                    )
                })}
                <div className="rating-input">
                    <div className={activeRating >= 1 ? 'colormark larger' : 'empty larger'} onMouseEnter={() => setActiveRating(1)} onMouseLeave={() => setActiveRating(rating)} onClick={() => setRating(activeRating)}>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={activeRating >= 2 ? 'colormark larger' : 'empty larger'} onMouseEnter={() => setActiveRating(2)} onMouseLeave={() => setActiveRating(rating)} onClick={() => setRating(activeRating)}>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={activeRating >= 3 ? 'colormark larger' : 'empty larger'} onMouseEnter={() => setActiveRating(3)} onMouseLeave={() => setActiveRating(rating)} onClick={() => setRating(activeRating)}>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={activeRating >= 4 ? 'colormark larger' : 'empty larger'} onMouseEnter={() => setActiveRating(4)} onMouseLeave={() => setActiveRating(rating)} onClick={() => setRating(activeRating)}>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={activeRating >= 5 ? 'colormark larger' : 'empty larger'} onMouseEnter={() => setActiveRating(5)} onMouseLeave={() => setActiveRating(rating)} onClick={() => setRating(activeRating)}>
                        <i className="fa-solid fa-star"></i>
                    </div>
                </div>
                <textarea rows='8' className="textmark reviewText" maxLength={500} placeholder="Leave your review here" autoFocus onChange={(e) => setReview(e.target.value)} />
                <button disabled={review.length < 10 || rating < 1}>Submit Your Review</button>
            </form>
        </div>
    )
}

export default ReviewFormModal
