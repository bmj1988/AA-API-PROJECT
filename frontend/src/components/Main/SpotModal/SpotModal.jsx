
import { useSelector } from "react-redux";

import './SpotModal.css'
import PriceButton from "./PriceButton";
import Reviews from "../../Reviews/Reviews";

const SpotModal = ({ spot }) => {
    const spotInfo = useSelector((state) => state.spots[spot.id])
    const owner = spotInfo.Owner
    console.log(`SPOT INFO!!!!!!!!!!`, spotInfo)

    return (
        <div className={'spotModalContainer'}>
            <div className={'topLine'}>
                <h1>{spot.name}</h1>
                <h2>{`${spot.city}, ${spot.state}, ${spot.country}`}</h2>
            </div>
            <div className={'imageDisplay'}>
                <img src={spot.previewImage} className="spotImage"/>
                {spotInfo.SpotImages.map((image) => {
                    return <img key={image.id} src={image.url} className={'spotImage'} />
                })}
            </div>
            <div className="bioButtonContainer">
                <div className="bio">
                    <h2>{`Hosted by ${owner.firstName} ${owner.lastName}`}</h2>
                    <div style={{display: 'flex', justifyContent: 'space-between', width: '800px'}}>
                        <p>{spotInfo.description}</p>
                        <PriceButton spotInfo={{...spotInfo}} style={{alignSelf: 'center'}}/>
                    </div>
                </div>

            </div>
            {/* insert reviews */}
            <Reviews spot={spotInfo}/>
        </div>
    )
}

export default SpotModal;
