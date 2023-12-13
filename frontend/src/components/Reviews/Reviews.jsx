import { useEffect, useState } from "react"
import { thunkReviewsBySpot, reviewsArray } from "../../store/reviews"
import { useDispatch, useSelector } from "react-redux"
import SingleReview from "./SingleReview"
import './Reviews.css'
import ReviewForm from "./ReviewForm"

let displayText
const Reviews = ({ spot }) => {
    const dispatch = useDispatch();
    let user = useSelector((state) => state.session.user)
    const [displayReviewForm, setDisplayReviewForm] = useState(false)
    const [PostButton, setPostButton] = useState(false)

    console.log(`THIS IS THE SPOT INFO FOR THE REVIEWS SECTION`, spot)

    useEffect(() => {
        const loadreviews = async () => {
            return dispatch(thunkReviewsBySpot(spot.id))
        }
        loadreviews();
        console.log('Reviews Loaded')
    }, [dispatch, spot.id])
    const reviewArray = useSelector(reviewsArray);

    if (!user) user = {id: 0}
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

    /// HELPERS : import from separate file when code is working



    return (
        <div className='reviewContainer'>
            <div className={`starRating reviewRunner`}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <i className="fa-solid fa-star" />
                    <p style={{ marginLeft: '5px' }}>{(spot.avgRating ? spot.avgRating : 'New')}</p>
                </div>
                <p>{(spot.numReview > 0 ? `Based on ${spot.numReview} Reviews` : '')}</p>
            </div>
            {PostButton && <button onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setDisplayReviewForm(!displayReviewForm)
            }}>{displayText}</button>

            }
            <div>{(displayReviewForm === true && user.id > 0) && <ReviewForm spotId={spot.id} userId={user.id}/>}</div>
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
