import { useModal } from "../../context/Modal"

const OpenModalButton = ({modalComponent, buttonText, onButtonClick, onModalClose, buttonStyling}) => {
    const {setModalContent, setOnModalClose} = useModal();

    const handleClick = () => {
        if (typeof onButtonClick === 'function') onButtonClick();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    }
    let cssStyling = ''
    if (buttonStyling) cssStyling = buttonStyling
    return (
        <button style={{cursor: 'pointer'}} className={buttonStyling} onClick={handleClick}>
            {buttonText}
        </button>
    )
}
export default OpenModalButton;
