import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialDoctors = () => {
    const { user } = useContext(AuthContext);
    const { 
        potentialChats, 
        createChat, 
        updateCurrentChat, 
        setUserChats, 
        onlineUsers, 
        setPotentialChats,
        setIsUserChatVisible // Add this line to destructure the new state updater
    } = useContext(ChatContext);

    const handleUserClick = async (doctorId) => {
        try {
            const newChat = await createChat(user._id, doctorId);
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
                    prevChats.filter(contact => contact._id !== doctorId)
                );

                // Hide the UserChat component
                setIsUserChatVisible(false);
            }
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };

    // Filter online doctors from potential chats
    const filteredPotentialChats = (Array.isArray(potentialChats) ? potentialChats : []).filter(doctor =>
        onlineUsers.some(onlineUser => onlineUser.userId === doctor._id)
    );

    return (
        <div className="all-users">
            {filteredPotentialChats.length > 0 ? (
                filteredPotentialChats.map(doctor => (
                    <div
                        className="single-user"
                        key={doctor._id}
                        onClick={() => handleUserClick(doctor._id)}
                    >
                        {doctor.username}
                        <span className={`user-${onlineUsers.some(user => user.userId === doctor._id) ? 'online' : 'offline'}`}></span>
                    </div>
                ))
            ) : (
                <p>No online doctors available.</p>
            )}
        </div>
    );
};

export default PotentialDoctors;
