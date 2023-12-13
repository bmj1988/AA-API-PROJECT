import { useModal } from "../../context/Modal";

const ImageDisplay = ({url}) => {
    console.log(url)
    return (
        <div className="bigImageDiv">
            <img src={url} className="bigImage" />
        </div>
    )
}

export default ImageDisplay;
