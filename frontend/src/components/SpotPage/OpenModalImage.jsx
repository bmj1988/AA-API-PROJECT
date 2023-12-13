import { useModal } from "../../context/Modal"

const OpenModalImage = ({ modalComponent, url, onImageClick, onModalClose, Class }) => {
    const { setModalContent, setOnModalClose } = useModal();

    const handleClick = () => {
        if (typeof onImageClick === 'function') onImageClick();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    }

    return (
        <img src={url} style={{ cursor: 'pointer' }} onClick={handleClick} className={Class}/>
    )
}
export default OpenModalImage;
