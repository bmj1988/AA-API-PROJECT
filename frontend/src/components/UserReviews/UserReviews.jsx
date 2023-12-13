// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
// import { thunkGetUserReviews } from "../../store/reviews";
import { reviewsArray } from "../../store/reviews";
import SingleReview from "../Reviews/SingleReview";

const UserReviews = () => {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(thunkGetUserReviews())

    // }, [dispatch]);

    const userReviews = useSelector(reviewsArray);

    if (!userReviews) return 'LOADING > > >'

    return (
        <>
        <h1>Manage Your Reviews</h1>
        <div className='reviewRunner userReview'>
            {userReviews.map((review) => {
                return <SingleReview key={review.id} review={review} userReviews={true} />
            })}
        </div>
        </>
    )
}
export default UserReviews;
