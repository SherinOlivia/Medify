import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from './../../hooks/useFetchRecipient';
import { Stack } from 'react-bootstrap';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';

const ChatBox = () => {
    const { user } = useContext(AuthContext);
    const { currentChat, messages, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
    const { recipientUser } = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState("");
    const scrollRef = useRef();

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        // The useEffect will automatically trigger when currentChat._id changes
        // No need for a separate loadMessagesForChat function
    }, [currentChat._id]);

    const handleSendMessage = async () => {
        if (textMessage.trim() === '') return;
    
        try {
            await sendTextMessage(textMessage, currentChat._id);
            setTextMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (!recipientUser || !currentChat) {
        return (
            <p className="text-light" style={{ textAlign: "center", width: "100%" }}>
                No Conversation Selected Yet ....
            </p>
        );
    }

    if (isMessagesLoading) {
        return (
            <h1 className="text-danger" style={{ textAlign: "center", width: "100%" }}>Loading Chat ....</h1>
        );
    }

    // Safely accessing username
    const username = recipientUser?.data?.username || recipientUser?.username;

    return (
        <Stack gap={4} className="chat-box text-light">
            <div className="chat-header">
                <strong>{username}</strong>
            </div>
            <Stack gap={3} className="messages">
                {messages && messages.map((message, index) => {
                    return (
                        <Stack key={index}
                            className={`${message?.senderId === user?._id ? "message self align-self-end flex-grow-0" : "message align-self-start flex-grow-0"}`}
                            ref={scrollRef}
                        >
                            <span>{message?.text}</span>
                            <span className="message-footer">
                                {moment(message?.createdAt).calendar()}
                            </span>
                        </Stack>
                    )
                })}
            </Stack>
            <Stack direction="horizontal" gap={3} className="chat-input-emoji flex-grow-0">
                <InputEmoji value={textMessage} onChange={setTextMessage} borderColor="rgba(72,112,225,0.2)" />
                <button className="send-btn" onClick={handleSendMessage}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send" viewBox="0 0 16 16">
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                    </svg>
                </button>
            </Stack>
        </Stack>
    );
};

export default ChatBox;