import { useSelector } from 'react-redux';
import './SpotModal.css';
import { datesArray } from '../../../store/stay';
import { useEffect, useState } from 'react';

const PriceButtonOnModal = ({ spot }) => {
    const spotInfo = useSelector((state) => state.spots[spot.id])
    const [startDate, endDate] = useSelector(datesArray)
    const [days, setDays] = useState(null)
    const [total, setTotal] = useState(null)
    const [grandTotal, setGrandTotal] = useState(null)


    useEffect(() => {
        if (startDate && endDate) {
            let time = endDate.getTime() - startDate.getTime()
            setDays(time / (1000 * 60 * 60 * 24))
        }
    }, [startDate, endDate])

    useEffect(() => {
        if (days) setTotal(days * spotInfo?.price)
    }, [days, spotInfo?.price])

    useEffect(() => {
        if (total) setGrandTotal(total + (total * .15))
    }, [total])

    // const reserveDates = (e) => {
    //     e.preventDefault();
    //     const reservation = {
    //         startDate,
    //         endDate,
    //         spotId: spot.id,
    //         userId: user.id
    //     }
    //     closeModal();
    // }

    const reserve = (e) => {
        e.preventDefault();
        alert('Feature coming soon!')
        return;
    }



    /// reviewCase is a great candidate for refactoring, this same section is used many times
    let reviewCase;
    if (spotInfo.numReview > 0) {
        reviewCase = spotInfo.numReview > 1 ? `· ${spotInfo.numReview} Reviews` : `· ${spotInfo.numReview} Review`
    }

    return (
        <div className='priceButtonContainer'>
            <div className='priceButtonInfo datesDisplay'>
                {startDate && <p>Start Date: {startDate.toLocaleDateString('en-US')}</p>}
                {endDate && <p style={{ textAlign: 'end' }}>End Date: {endDate.toLocaleDateString('en-US')} </p>}
            </div>
            <div className='priceButtonInfo'>
                <p>{`$`} <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{`${Number(spotInfo.price).toFixed(2)}`}</span>{` per night`}</p>
                <div className={`starRating`}>
                    <i className="fa-solid fa-star" />{`${spotInfo.avgRating || `New`}  ${reviewCase || ''}`}
                </div>
            </div>
            <div className={"buttonDiv"}>
                <button onClick={(e) => reserve(e)} className={'reserveButton'}>Reserve</button>
            </div>
            {startDate && endDate && total && grandTotal && <div className='priceDiv'>
                <div className='priceItem'>
                    <p>{`$${Number(spotInfo.price).toFixed(2)} x ${days} nights`}</p>
                    <p style={{ textAlign: 'end' }}>${(Number(spotInfo.price) * Number(days)).toFixed(2)}</p>
                </div>
                <div className='priceItem lastPrice'>
                    <p>{`Mortar booking fee`}</p>
                    <p style={{ textAlign: 'end' }}>${(Number(total) * .15).toFixed(2)}</p>
                </div>
                <div className='priceTotal'>
                    <p className='textmark'>Total before taxes</p><p style={{ fontWeight: 'bold', textAlign: 'end' }} className='textmark larger'>${Number(grandTotal).toFixed(2)}</p>
                </div>

            </div>}

        </div>
    )
}

export default PriceButtonOnModal;
