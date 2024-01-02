// import { useModal } from "../../context/Modal"
// import MessageModal from "./MessageModal"
const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}

const Message = ({ message }) => {
// onClick={(e) => openMessage(e)}
return (
    <tr className="inboxRow" >
        <td>{new Date(message.createdAt).toLocaleDateString('en-US', options)}</td>
        <td>{message.sender.firstName}</td>
        <td>{message.message}</td>
    </tr>
)
}

export default Message;
