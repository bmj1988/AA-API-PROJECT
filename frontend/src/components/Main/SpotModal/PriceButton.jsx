import './SpotModal.css';

const PriceButton = ({spotInfo}) => {
    return (
        <div className='priceButtonContainer'>
            <div className='priceButtonInfo'>
                <p>{`$ ${spotInfo.price} per night`}</p>
                <div className={`starRating`}>
                        <i className="fa-solid fa-star" />{`${spotInfo.avgRating || ' '} - ${spotInfo.numReview} Reviews`}
                    </div>
            </div>
            <div className={"buttonDiv"}>
                <button className={'reserveButton'}>Reserve</button>
            </div>

        </div>
    )
}

export default PriceButton;
