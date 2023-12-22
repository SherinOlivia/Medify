/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { Stack } from 'react-bootstrap';
import profilePic from '../../assets/profilePic.svg';
import moment from 'moment';
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useFetchLatestMessage } from '../../hooks/useFetchLatestMessage';
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";

const UserChat = ({ chat, user }) => {
    const { recipientUser } = useFetchRecipientUser(chat, user);
    const {
        onlineUsers,
        notifications,
        markThisUserNotificationsAsRead,
        setCurrentChat // assuming setCurrentChat is exported from ChatContext
    } = useContext(ChatContext);
    const { latestMessage } = useFetchLatestMessage(chat);
    
    const unreadNotifications = unreadNotificationsFunc(notifications, recipientUser?.user?._id);
    
    const handleChatClick = () => {
        setCurrentChat(chat); // Set the current chat to the one clicked
        if (unreadNotifications.length > 0) {
            markThisUserNotificationsAsRead(unreadNotifications, notifications);
        }
    };
    
    const thisUserNotifications = unreadNotifications?.filter

    if (!recipientUser) {
        return null; 
    }

    if (!recipientUser?.data) {
        return null;
    }

    // const displayName = user.role === 'doctor' ? recipientUser.data?.username || recipientUser?.username : "unknown"
    const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?.user?._id)
    

    const truncateText = (text) => {
        let shortText = text.substring(0, 20)

        if(text.length > 20){
            shortText = shortText + '...'
        }
        return shortText
    }
    
    return (
        <Stack
            direction="horizontal"
            gap={3}
            className="user-card align-items-center p-2 justify-content-between"
            role="button"
            style={{width: "350px"}}
            onClick={handleChatClick}
        >
            <div className="d-flex">
                <div className="me-2">
                    <img src={profilePic} height="35px"/>
                </div>
                <div className="text-content">
                <div className="name">{recipientUser.data?.username || recipientUser?.username}</div>
                    <div className="text">{
                    latestMessage?.text && (
                        <span>{truncateText(latestMessage?.text)}</span>
                    )}</div>
                </div>
                <div className="d-flex flex-column align-items-end"  style={{width: "130px"}}>
                <div className="date">
                    {latestMessage ? (moment(latestMessage.createdAt).calendar()) : ("No messages")}
                </div>
                    <div className={thisUserNotifications?.length > 0 ? "" : "this-user-notifications" }>
                        {thisUserNotifications?.length > 0 ?  '' : "this-user-notifications"}
                    </div>
                    <span className={isOnline ? "user-online" : "user-offline"}></span>
                </div>
            </div>
        </Stack>
    );
}

export default UserChat;