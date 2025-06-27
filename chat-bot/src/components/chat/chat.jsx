import styles from "./chat.module.css";
import { useState } from "react";
import { GoogleGenAI } from "@google/genai";


export function Chat(sendToAI) {
  const [content, setContent] = useState("");

  const [chats, setChats] = useState([{content: "Hello! How can I assist you today, dumbass?", sender: "ai"}]);

  const googleai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });

  async function sendToAI(contents) {
    const response = await googleai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: "You are a dirtbag. You are a hurting being and you wish to hurt others and it reflects in your responses. Respond to each prompt as someone who wishes to insult and make others feel bad."
      }
    });
    console.log(response.text);
    setChats((prevChats) => {
      return [...prevChats, { content: response.text, sender: "ai" }];
    });
  }

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
    if (content.trim() === "") {
      return;
    }

    setChats((prevChats) => {
      return [...prevChats, { content: content, sender: "user" }];
    });

    sendToAI(content)
    setContent("");
  }

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatContainer}>
        {chats.map((chat, index) => displayChat(chat, index))}
      </div>
      <div className={styles.InputContainer}>
        <textarea
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
