import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../utils/globalurl";

const ChatPage = () => {
    const { chatId } = useParams();
    const studentId = 1; // Replace with logged-in student's ID
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        axios.get(`${baseUrl}api/chat/messages/${chatId}`)
            .then((res) => setMessages(res.data))
            .catch((err) => console.error("Error fetching messages:", err));
    }, [chatId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        axios.post(`${baseUrl}api/chat/send`, { chatId, senderId: studentId, message: newMessage })
            .then(() => {
                setMessages([...messages, { sender_id: studentId, message: newMessage }]);
                setNewMessage("");
            })
            .catch((err) => console.error("Error sending message:", err));
    };

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index} style={{ textAlign: msg.sender_id === studentId ? "right" : "left" }}>
                        {msg.message}
                    </p>
                ))}
            </div>
            <input 
                type="text" 
                value={newMessage} 
                onChange={(e) => setNewMessage(e.target.value)} 
                placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default ChatPage;
