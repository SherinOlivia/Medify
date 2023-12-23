import { useContext } from 'react';
import { Container, Stack } from 'react-bootstrap';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import UserChat from '../components/chat/UserChat';
import PotentialChats from '../components/chat/potentialChats';
import PotentialDoctors from '../components/chat/potentialDoctors';
import ChatBox from '../components/chat/chatBox';
import DoctorUserChat from '../components/chat/DoctorUserChat';

const Chat = () => { 
    const { user } = useContext(AuthContext);
    const { 
        userChats, 
        isUserChatsLoading, 
        currentChat, 
        updateCurrentChat, 
        isUserChatVisible, // Destructure the state from context
        setIsUserChatVisible // Include the function to update the visibility
    } = useContext(ChatContext);
    
    return (
        <Container>
            {user?.role === 'patient' && <PotentialDoctors />}
            {user?.role === 'doctor' && <PotentialChats />}
            <Stack direction="horizontal" gap={4} className='align-items-start'>
                {/* Only render the user chats if isUserChatVisible is true */}
                {isUserChatVisible && (
                    <Stack className='messages-box flex-grow-0 pe-3' gap={3}>
                        {isUserChatsLoading && <p>Loading Chats...</p>}
                        {!isUserChatsLoading && userChats?.map((chat, index) => (
                            <div key={index} onClick={() => {
                                updateCurrentChat(chat);
                                setIsUserChatVisible(true); // When a chat is clicked, ensure the chat list stays visible
                            }}>
                                {user?.role === 'patient' ? <UserChat chat={chat} user={user}/> : <DoctorUserChat chat={chat} user={user}/>}
                            </div>
                        ))}
                    </Stack>
                )}
                {currentChat && <ChatBox />}
            </Stack>
        </Container>
    );
}

export default Chat;