import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpotImage } from "../../store/spots";
import './spotpage.css'
import { useState } from "react";

const ImageDisplay = ({ url, spotInfo, id, imageCarousel }) => {
    const dispatch = useDispatch();
    const { closeModal, setModalContent } = useModal();
    const user = useSelector((state) => state.session.user)
    const [nextId, setNextId] = useState(id)

    if (!imageCarousel) return 'LOADING > > >'
    /// finds current image in the carousel and then grabs the index
    const finder = imageCarousel.find((image) => image.url === url)
    const currentIndex = imageCarousel.indexOf(finder)

    /// button functions
    const deleteImage = () => {
        dispatch(thunkDeleteSpotImage(id, spotInfo.id)).then(() => closeModal())
    }
    const carouselLeft = () => {
        const setter = imageCarousel[currentIndex - 1].id || 0
        setNextId(Number(setter))
        setModalContent(<ImageDisplay url={imageCarousel[currentIndex - 1].url} spotInfo={spotInfo} id={nextId} imageCarousel={imageCarousel} />)
    }

    const carouselRight = () => {
        const setter = imageCarousel[currentIndex + 1].id || 0
        setNextId(Number(setter))
        setModalContent(<ImageDisplay url={imageCarousel[currentIndex + 1].url} spotInfo={spotInfo} id={nextId} imageCarousel={imageCarousel} />)
    }

    return (
        <div className="bigImageDiv">
            <img src={url} className="bigImage" />
            <div className="imageDisplayButtons">
                {imageCarousel[currentIndex - 1] && <i className="fa-solid fa-arrow-left colormark arrow" onClick={() => {
                    setNextId(id - 1)
                    carouselLeft()
                    }
                    }></i>}
                {(spotInfo && user.id === spotInfo.Owner.id && !(currentIndex === 0)) && <button onClick={() => deleteImage()} className={'textmark imageDisplayDelete'}>DELETE IMAGE</button>}
                {imageCarousel[currentIndex + 1] && <i className="fa-solid fa-arrow-right colormark arrow" onClick={() => carouselRight()}></i>}
            </div>
        </div>
    )
}

export default ImageDisplay;
