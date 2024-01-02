import './messaging.css'
import OpenModalMessage from "./OpenModalMessage"
import MessageModal from './MessageModal'

// const options = {
//     weekday: 'short',
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
// }

const Inbox = ({ messages }) => {
 console.log(`MESSSAGES`, messages)
    return (
        <table>
            <thead>
                <tr>
                    <th className='inboxHeader' scope='col'>Sent:</th>
                    <th className='inboxHeader' scope='col'>From:</th>
                    <th className='inboxHeader' scope='col'>Message:</th>
                </tr>
            </thead>
            <tbody>
                {messages.length > 0 && messages.map((message) => {
                    return (
                        <OpenModalMessage key={message.id} message={message} modalComponent={<MessageModal message={message} />} />
                    )
                })}
            </tbody>
        </table>
    )
}
export default Inbox;
