import { useState } from "react"

const ReviewForm = ({spot}) => {
    const [review, setReview] = useState('')

    return (
        <div>
            <h5 className="textmark">Leave your review</h5>
            <textarea rows='8' columns='100' className="textmark reviewText" autoFocus/>
            <button>Submit Review</button>
        </div>
    )
}

export default ReviewForm
