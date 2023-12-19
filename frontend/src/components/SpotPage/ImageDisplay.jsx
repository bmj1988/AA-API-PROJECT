import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteSpotImage } from "../../store/spots";

const ImageDisplay = ({ url, spotInfo, id }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const user = useSelector((state) => state.session.user)
    console.log(`!!!!!!!!! spot info to image display`, spotInfo)
    const deleteImage = () => {
        dispatch(thunkDeleteSpotImage(id, spotInfo.id)).then(() => closeModal())
    }

    return (
        <div className="bigImageDiv">
            <img src={url} className="bigImage" />
            <div className="imageDisplayButtons">
                <i className="fa-solid fa-arrow-left colormark"></i>
                {spotInfo && user.id === spotInfo.Owner.id && <button onClick={() => deleteImage()} className={'textmark'}>DELETE IMAGE</button>}
                <i className="fa-solid fa-arrow-right colormark"></i>
            </div>
        </div>
    )
}

export default ImageDisplay;
