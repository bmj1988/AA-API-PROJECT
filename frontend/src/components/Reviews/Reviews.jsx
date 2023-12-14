import { useEffect, useState } from "react"
import { thunkReviewsBySpot, reviewsArray } from "../../store/reviews"
import { useDispatch, useSelector } from "react-redux"
import SingleReview from "./SingleReview"
import './Reviews.css'
import ReviewForm from "./ReviewForm"
import OpenModalButton from "../OpenModalButton/OpenModalButton"
import ReviewFormModal from "./ReviewFormModal"

let displayText
const Reviews = ({ spot, page }) => {
    const dispatch = useDispatch();
    let user = useSelector((state) => state.session.user)
    const [displayReviewForm, setDisplayReviewForm] = useState(false)
    const [PostButton, setPostButton] = useState(false)

    useEffect(() => {
        const loadreviews = async () => {
            return dispatch(thunkReviewsBySpot(spot.id))
        }
        loadreviews();
    }, [dispatch, spot.id])
    const reviewArray = useSelector(reviewsArray);

    if (!user) user = { id: 0 }
    const priorReview = reviewArray.find((review) => review.User.id === user.id)




    useEffect(() => {
        if (spot.Owner.id === user.id) {
            setPostButton(false);
            return


        }
        else if (priorReview && priorReview.userId === user.id) {
            setPostButton(false);
            return

        }
        else if (user.id === 0) {
            setPostButton(false);
            return
        }
        else if (spot.numReview > 0) {
            displayText = 'Post your review'
            setPostButton(true)
            return

        }
        else if (spot.numReview === 0) {
            displayText = 'Be the first to leave a review!'
            setPostButton(true)
            return
        }
        return
    }, [priorReview, user, spot.Owner.id, spot.numReview])
        ;

    /// HELPERS : import from separate file when code is working
    let reviewCase
    if (spot.numReview) {
        reviewCase = spot.numReview > 1 ? 'Reviews' : 'Review'
    }

    return (
        <div className='reviewContainer'>
            <div className={`starRating reviewRunnerInPage`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="fa-solid fa-star" />
                    <p style={{ marginLeft: '5px' }}>{(spot.avgRating ? spot.avgRating : 'New')}</p>
                </div>
                <p>{(spot.numReview > 0 ? `Based on ${spot.numReview} ${reviewCase}` : '')}</p>
            </div>
            {(PostButton && !page) && <button onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setDisplayReviewForm(!displayReviewForm)
            }}>{displayText}</button>}
            {(PostButton && page) && <OpenModalButton buttonText={displayText} modalComponent={<ReviewFormModal spotId={spot.id} userId={user.id}/>}/>}

            <div>{(displayReviewForm === true && user.id > 0 && !page) && <ReviewForm spotId={spot.id} userId={user.id} />}</div>
            <div>
                {reviewArray.map((review) => {
                    return <SingleReview key={review.id} review={review} page={page}/>
                })}

            </div>
        </div>
    )
}
export default Reviews;


// className={displayReviewForm ? '' : 'hidden'}
