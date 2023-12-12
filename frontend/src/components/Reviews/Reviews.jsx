import { useEffect, useState } from "react"
import { thunkReviewsBySpot, reviewsArray } from "../../store/reviews"
import { useDispatch, useSelector } from "react-redux"
import SingleReview from "./SingleReview"
import './Reviews.css'
import ReviewForm from "./ReviewForm"


const Reviews = ({ spot }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)
    const [displayReviewForm, setDisplayReviewForm] = useState(false)
    const [PostButton, setPostButton] = useState(false)

    console.log(`THIS IS THE SPOT INFO FOR THE REVIEWS SECTION`, spot)

    useEffect(() => {
        const loadreviews = async () => {
            return await dispatch(thunkReviewsBySpot(spot.id))
        }
        loadreviews();
    }, [dispatch, spot.id])
    const reviewArray = useSelector(reviewsArray);
    const priorReview = reviewArray.find((review) => review.User.id === user.id)
    console.log(`PRIOR REVIEW`, priorReview)
    useEffect(() => {
        if (spot.Owner.id === user.id) {
            setPostButton(false);


        }
        else if (priorReview && priorReview.userId === user.id) {
            setPostButton(false);

        }
        else if (spot.numReview > 0) {
            setPostButton(() => buttonReviews)

        }
        else if (spot.numReview === 0) {
            setPostButton(() => buttonNoReviews)
        }
        return
    }, [priorReview, user])

    /// HELPERS : import from separate file when code is working

    const postClick = () => {
        setDisplayReviewForm(!displayReviewForm)
        return
    }

    const buttonNoReviews = () => {
        return (
            <button onClick={() => postClick()}>Be the first to leave a review!</button>

        )
    }
    const buttonReviews = () => {
        return (
            <button onClick={() => postClick()}>Post your review</button>
        )
    }


    return (
        <div className='reviewContainer'>
            <div className={`starRating reviewRunner`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="fa-solid fa-star" />
                    <p style={{ marginLeft: '5px' }}>{(spot.avgRating ? spot.avgRating : 'New')}</p>
                </div>
                <p>{(spot.numReview > 0 ? `Based on ${spot.numReview} Reviews` : '')}</p>
            </div>
            {PostButton ? <PostButton spot={spot} /> : <></>}
            {displayReviewForm && <ReviewForm/>}
            <div>
                {reviewArray.map((review) => {
                    return <SingleReview key={review.id} review={review} />
                })}

            </div>
        </div>
    )
}
export default Reviews;


// className={displayReviewForm ? '' : 'hidden'}
