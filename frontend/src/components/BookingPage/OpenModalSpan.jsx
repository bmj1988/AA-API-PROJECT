import { useModal } from "../../context/Modal"

const OpenModalSpan = ({ modalComponent, spanText, onSpanClick, onModalClose }) => {
    const { setModalContent, setOnModalClose } = useModal();

    const handleClick = () => {
        if (typeof onItemClick === 'function') onItemClick();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    }

    return (
        <span style={{ cursor: 'pointer', display: 'inline', fontFamily: 'inherit', fontSize: 'inherit' }} onClick={handleClick}>
            {spanText}
        </span>
    )
}
export default OpenModalSpan
