import { useModal } from "../../context/Modal"

const OpenModalMenuItem = ({modalComponent, itemText, onItemClick, onModalClose}) => {
    const {setModalContent, setOnModalClose} = useModal();

    const handleClick = () => {
        if (typeof onButtonClick === 'function') onItemClick();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    }

    return (
        <li onClick={handleClick}>
            {itemText}
        </li>
    )
}
export default OpenModalMenuItem
