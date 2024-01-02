import { useEffect, useState } from 'react'
import './messaging.css'
import { thunkDeleteMessage, thunkGetReplies, thunkSend } from '../../store/messages'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../context/Modal'

const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}

const MessageModal = ({ message }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [displayReply, setDisplayReply] = useState(false)
    const [messageText, setMessage] = useState('')
    const rawReplies = useSelector((state) => state?.messages[message.id]?.replies)
    const [errors, setErrors] = useState({})
    useEffect(() => {
        dispatch(thunkGetReplies(message.id))
    }, [dispatch])
    const sentDate = new Date(message.createdAt).toLocaleDateString('en-US', options)
    const replies = rawReplies?.filter((reply) => reply.id !== message.id)
    const reply = (e) => {
        e.preventDefault();
        setDisplayReply(true)
    }

    const deleteMessage = (e) => {
        e.preventDefault();
        dispatch(thunkDeleteMessage(message.id))
        closeModal()
    }

    const send = (e) => {
        e.preventDefault();
        const reply = {
            toId: message.fromId,
            fromId: message.toId,
            replyId: message?.replyId || message.id,
            message: messageText
        }
        console.log(reply)
        const response = dispatch(thunkSend(reply))
        if (response.errors) {
            setErrors(response)
        } else {
            closeModal();
        }

    }
    return (
        <div className="messageModal">
            <h2 className='messageHeader'>message</h2>
            <div style={{ borderBottom: '1px solid black' }}>
                <div>
                    <p className='messageInfo'>{`From: ${message.sender.firstName} ${message.sender.lastName}`}</p>
                    <p className='messageInfo'>{`Sent: ${sentDate}`}</p>
                    <p className='messageP'>{message.message}</p>
                </div>
                <div className='messageButtons'>
                    <i className="fa-solid fa-reply larger colormark messageButton" style={{ cursor: 'pointer' }} onClick={(e) => reply(e)} />
                    <i class="fa-solid fa-trash errors larger messageButton" onClick={(e) => deleteMessage(e)} />
                </div>
            </div>
            {displayReply && <div className='messageReplyDiv'>
                <textarea rows='4' className='replyBox textmark' placeholder='Type your reply here' onChange={(e) => setMessage(e.target.value)} minLength={1} maxLength={500} />
                <button className='sendButton' onClick={(e) => send(e)}>Send</button>
            </div>}
            {replies?.length > 0 && replies.map((reply) => {
                return (<div style={{ margin: '10px' }}>
                    {Object.values(errors).length > 1 && <p className='errors'>{errors.errors}</p>}
                    <h4>previous message: </h4>
                    <p className='messageInfo'>{`From: ${reply.sender.firstName} ${message.sender.lastName}`}</p>
                    <p className='messageInfo'>{`Sent: ${new Date(reply.createdAt).toLocaleDateString('en-US', options)}`}</p>
                    <p className='messageP'>{reply.message}</p>
                </div>)
            })}


        </div>
    )

}

export default MessageModal
