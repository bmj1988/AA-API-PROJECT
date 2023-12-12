import './Reviews.css'

const SingleReview = ({ review }) => {
    console.log(`SINGLE REVIEW PROP`, review)
    const date = new Date(review.createdAt)
    const month = date.toLocaleString('default', {month: "long"})
    const toPublicDate = `${date.getDate()}, ${month}, ${date.getFullYear()}`


    return (
        <div>
            <h3>{review.User.firstName}</h3>
            <h4>{toPublicDate}</h4>
            <div style={{display: 'flex', width: '800px', justifyContent:'space-between'}}><p>{review.review}</p>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <i style={{color:"#1bcdd0"}} className="fa-solid fa-star" />
            <p className="starRating">{review.stars}</p>
            </div>
            </div>
        </div>
    )
}
export default SingleReview;
