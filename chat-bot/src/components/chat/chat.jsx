import styles from "./chat.module.css";
import { useState } from "react";

export function Chat() {
  const tempChats = [
    { message: "Hey, how are you?" },
    { message: "I'm good! How can I help you today?" },
    { message: "Can you remind me to drink water?" },
    { message: "Sure! I’ll remind you every 2 hours 😊" },
    { message: "Thanks!" },
    { message: "You're welcome!" },
  ];
  const [chats, setChats] = useState(tempChats);

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatContainer}>
        {chats.map((chat, index)=>(<div key={index}>{chat}</div>))}
      </div>
      <div className={styles.InputContainer}>
        <input
          type="text"
          placeholder="Message AI Chatbot"
          className={styles.UserInput}
        />
        <img src="/send-icon.png" alt="" className={styles.MessageIcon} />
      </div>
    </div>
  );
}
