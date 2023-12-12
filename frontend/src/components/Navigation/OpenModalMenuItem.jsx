import { useModal } from "../../context/Modal"

const OpenModalMenuItem = ({ modalComponent, itemText, onItemClick, onModalClose }) => {
    const { setModalContent, setOnModalClose } = useModal();

    const handleClick = () => {
        if (typeof onItemClick === 'function') onItemClick();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    }

    return (
        <li style={{ cursor: 'pointer', display: 'flex' }} onClick={handleClick}>
            {itemText}
        </li>
    )
}
export default OpenModalMenuItem
