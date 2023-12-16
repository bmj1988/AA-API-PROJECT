import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkGetUserReviews } from "../../store/reviews";
import { reviewsArray } from "../../store/reviews";
import SingleReview from "../Reviews/SingleReview";

const UserReviews = () => {
    const currentUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetUserReviews())

    }, [dispatch]);

    const userReviews = useSelector(reviewsArray).filter((review) => review.userId === currentUser.id);

    console.log(userReviews)

    if (!userReviews.length) return (<h1 className="textmark"> User has no reviews yet </h1>)

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
