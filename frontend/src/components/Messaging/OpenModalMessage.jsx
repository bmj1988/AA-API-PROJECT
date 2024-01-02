import { useModal } from "../../context/Modal"
import './messaging.css'
// import Message from "./Message";
const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}

const OpenModalMessage = ({ modalComponent, message, onMessageClick, onModalClose }) => {
    const { setModalContent, setOnModalClose } = useModal();

    const handleClick = () => {
        if (typeof onMessageClick === 'function') onMessageClick();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    }
    const reply = () => {

    }
    return (
        <>
            <tr className="inboxRow" onClick={handleClick} style={{cursor: 'pointer'}}>
                <td>{new Date(message.createdAt).toLocaleDateString('en-US', options)}</td>
                <td>{message.sender.firstName}</td>
                <td className="blockTd">{message.message}</td>
                <td><i className="fa-solid fa-reply larger colormark messageButton" style={{ cursor: 'pointer'}} onClick={(e) => reply(e)}/></td>
                <td><i className="fa-solid fa-trash errors larger messageButton"/></td>
            </tr>
        </>
    )
}
export default OpenModalMessage
