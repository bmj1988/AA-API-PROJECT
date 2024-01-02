import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Inbox from './Inbox';
import { messageByDateArray, thunkLoadInbox } from '../../store/messages';
import './messaging.css'

const MessageCenter = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.session?.user)
    useEffect(() => {
        dispatch(thunkLoadInbox())
    },[])
    const messagesArray = useSelector(messageByDateArray)
    const inboxArray = messagesArray.filter((message) => message.toId === user.id)
    console.log(`INBOX ARRAY`, inboxArray)

    return (
        <div>
            <h1>Your messages</h1>
            {inboxArray?.length > 0 && <Inbox messages={inboxArray}/>}
            {inboxArray?.length < 1 && <p>You have no messages in your inbox.</p>}
        </div>
    )
}

export default MessageCenter
