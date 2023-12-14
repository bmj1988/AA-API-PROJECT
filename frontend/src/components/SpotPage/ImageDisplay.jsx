const ImageDisplay = ({url}) => {
    return (
        <div className="bigImageDiv">
            <img src={url} className="bigImage" />
        </div>
    )
}

export default ImageDisplay;
