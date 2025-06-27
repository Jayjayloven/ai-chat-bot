import styles from "./chat.module.css";
import { useState } from "react";

export function Chat() {
  const [content, setContent] = useState("");
  const tempChats = [
    { content: "Hey there!", sender: "user" },
    { content: "Hello! How can I assist you today?", sender: "ai" },
    { content: "What's the weather like today?", sender: "user" },
    { content: "It's sunny with a high of 82°F.", sender: "ai" },
    { content: "Remind me to call my mom.", sender: "user" },
    { content: "Got it! Reminder set for later today.", sender: "ai" },
    { content: "What's 23 times 47?", sender: "user" },
    { content: "23 × 47 is 1081.", sender: "ai" },
    { content: "Nice.", sender: "user" },
    { content: "Glad to help 😄", sender: "ai" },
    { content: "Can you draft a thank-you content?", sender: "user" },
    {
      content: "Sure! 'Thank you for your support and kindness.'",
      sender: "ai",
    },
    { content: "Make it more casual.", sender: "user" },
    { content: "Okay: 'Thanks a ton for everything!'", sender: "ai" },
  ];
  const [chats, setChats] = useState(tempChats);

  function displayChat(chat, index) {
    if (chat.sender === "user") {
      return (
        <p className={styles.UserChat} key={index}>
          {" "}
          {chat.content}{" "}
        </p>
      );
    }
    if (chat.sender === "ai") {
      return (
        <p className={styles.AIChat} key={index}>
          {" "}
          {chat.content}{" "}
        </p>
      );
    }
  }

  function handleContentChange(event) {
    setContent(event.target.value);
  }

  function handleContentSend() {
    if (content.trim === "") {
      return;
    }

    setChats((prevChats) => {
      return [...prevChats, { content: content, sender: "user" }];
    });

    setContent("");
  }

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatContainer}>
        {chats.map((chat, index) => displayChat(chat, index))}
      </div>
      <div className={styles.InputContainer}>
        <textarea
          type="text"
          placeholder="Message AI Chatbot"
          className={styles.UserInput}
          value={content}
          onChange={handleContentChange}
        />
        <img
          src="/send-icon.png"
          alt=""
          className={styles.SendIcon}
          onClick={handleContentSend}
        />
      </div>
    </div>
  );
}
