import { useSelector } from "react-redux";
import './SpotModal.css'
import PriceButton from "./PriceButton";
import Reviews from "../../Reviews/Reviews";

const base_url = import.meta.env.BASE_URL;

const SpotModal = ({ spot }) => {
    const spotInfo = useSelector((state) => state.spots[spot.id])
    const owner = spotInfo.Owner
    const spotId = spot.id
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
                        <PriceButton spot={{...spotInfo}} style={{alignSelf: 'center'}}/>
                    </div>
                    <a href={`${base_url}spots/${spotId}`} target="_blank" rel='noreferrer' style={{fontSize:'10px', color: '#1bcdd0'}}> Open in separate tab</a>
                </div>

            </div>
            {/* insert reviews */}
            <Reviews spot={spotInfo}/>
        </div>
    )
}

export default SpotModal;
