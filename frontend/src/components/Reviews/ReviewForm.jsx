import { useState } from "react"
import { thunkAddReview } from "../../store/reviews"
import { useDispatch } from "react-redux"
import './Reviews.css'

const ReviewForm = ({ spotId, userId }) => {
    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [rating, setRating] =  useState(5)
    const [activeRating, setActiveRating] = useState(1)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newReview = {
            userId,
            spotId,
            review,
            stars: rating,
        }
        console.log(newReview)
        const responseReview = await dispatch(thunkAddReview(newReview)).then((data) => console.log(data))
        console.log(responseReview)
        setSubmitted(true)
        return responseReview
    }
    return (
        <div className={submitted ? 'hidden' : ''}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h5 className="textmark">Leave your review</h5>
                <div className="rating-input">
                    <div className={activeRating >= 1 ? 'colormark' : 'empty'} onMouseEnter={() => setActiveRating(1)} onMouseLeave={() => setActiveRating(rating)} onClick={() => setRating(activeRating)}>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={activeRating >= 2 ? 'colormark' : 'empty'} onMouseEnter={() => setActiveRating(2)} onMouseLeave={() => setActiveRating(rating)} onClick={() => setRating(activeRating)}>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={activeRating >= 3 ? 'colormark' : 'empty'} onMouseEnter={() => setActiveRating(3)} onMouseLeave={() => setActiveRating(rating)} onClick={() => setRating(activeRating)}>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={activeRating >= 4 ? 'colormark' : 'empty'} onMouseEnter={() => setActiveRating(4)} onMouseLeave={() => setActiveRating(rating)} onClick={() => setRating(activeRating)}>
                        <i className="fa-solid fa-star"></i>
                    </div>
                    <div className={activeRating >= 5 ? 'colormark' : 'empty'} onMouseEnter={() => setActiveRating(5)} onMouseLeave={() => setActiveRating(rating)} onClick={() => setRating(activeRating)}>
                        <i className="fa-solid fa-star"></i>
                    </div>
                </div>
                <textarea rows='8' className="textmark reviewText" autoFocus onChange={(e) => setReview(e.target.value)} />
                <button>Submit Review</button>
            </form>
        </div>
    )
}

export default ReviewForm

/// userId, spotId, review, stars
// onSubmit={(e) => handleSubmit(e)}
