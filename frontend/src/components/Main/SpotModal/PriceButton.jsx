import './SpotModal.css';

const PriceButton = ({spotInfo}) => {
    const reserve = (e) => {
        e.preventDefault();
        alert('Feature coming soon!')
        return;
    }
    let reviewCase
    if (spotInfo.numReview) {
        reviewCase = spotInfo.numReview > 1 ? `· ${spotInfo.numReview} Reviews` : `· ${spotInfo.numReview} Review`
    }
    return (
        <div className='priceButtonContainer'>
            <div className='priceButtonInfo'>
                <p>{`$ ${spotInfo.price} per night`}</p>
                <div className={`starRating`}>
                        <i className="fa-solid fa-star" />{`${spotInfo.avgRating || `New`}  ${reviewCase || ''}`}
                    </div>
            </div>
            <div className={"buttonDiv"}>
                <button onClick={(e) => reserve(e)}className={'reserveButton'}>Reserve</button>
            </div>

        </div>
    )
}

export default PriceButton;
