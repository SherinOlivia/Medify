import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
    const { user } = useContext(AuthContext);
    const { potentialChats, createChat, updateCurrentChat, setUserChats, onlineUsers, setPotentialChats } = useContext(ChatContext);

    const handleUserClick = async (otherUserId) => {
        try {
            const newChat = await createChat(user._id, otherUserId);
            if (newChat) {
                // Update the current chat to be the new chat
                updateCurrentChat(newChat);
                
                // Add the new chat to the user chats list
                setUserChats(prevChats => {
                    // Check if the chat already exists to avoid duplicates
                    const existingChat = prevChats.find(chat => chat._id === newChat._id);
                    if (existingChat) {
                        return prevChats; // Return existing chats if the chat is already there
                    }
                    return [...prevChats, newChat];
                });
    
                // Remove the new chat from potential chats
                setPotentialChats(prevChats => 
                    prevChats.filter(contact => contact._id !== otherUserId)
                );
            }
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };

    const filteredPotentialChats = (Array.isArray(potentialChats) ? potentialChats : []).filter(contact =>
        onlineUsers.some(onlineUser => onlineUser.userId === contact._id)
    );
    
    return (
        <div className="all-users">
            {filteredPotentialChats.map((u, index) => (
                <div
                    className="single-user"
                    key={index}
                    onClick={() => handleUserClick(u._id)}
                >
                    {u.username || u.email}
                    <span className={`user-${onlineUsers.some(user => user.userId === u._id) ? 'online' : 'offline'}`}></span>
                </div>
            ))}
        </div>
    );
};

export default PotentialChats;