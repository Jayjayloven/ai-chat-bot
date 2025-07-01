import styles from "./chat.module.css";
import Markdown from "react-markdown";
import { useEffect, useState, useRef } from "react";
import { GoogleGenAI } from "@google/genai";

export function Chat() {
  const [content, setContent] = useState("");
  const [chats, setChats] = useState([
    { content: "Hello! How can I assist you today?", sender: "ai" },
  ]);
  let AIResponding = false;
  const newestChatRef = useRef(null);
  const googleai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (newestChatRef.current) {
      newestChatRef.current.scrollIntoView();
    }
  }, [chats]);

  useEffect(() => {}, []);

  async function sendToAI(content) {
    setLoading(true);
    const response = await googleai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: content,
    });

    for await (const chunk of response) {
      console.log(chunk);

      if (AIResponding === true) {
        setChats((prevChats) => {
          const updatedChats = [...prevChats];
          const last = updatedChats[updatedChats.length - 1];
          updatedChats[updatedChats.length - 1] = {
            ...last,
            content: last.content + chunk.text,
          };
          return updatedChats;
        });
      }

      if (AIResponding === false) {
        setChats((prevChats) => {
          AIResponding = true;
          return [...prevChats, { content: chunk.text, sender: "ai" }];
        });
      }
    }

    AIResponding = false;
    setLoading(false);
  }

  function displayChat(chat, index) {
    if (chat.sender === "user") {
      return (
        <p className={styles.UserChat} key={index} ref={newestChatRef}>
          {" "}
          {chat.content}{" "}
        </p>
      );
    }
    if (chat.sender === "ai") {
      return (
        <div key={index} className={styles.AIChat} ref={newestChatRef}>
          <Markdown>{chat.content}</Markdown>
        </div>
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

    sendToAI(content);
    setContent("");
  }

  function handleEnterSubmission(event) {
    if (event.key === "Enter") {
      event.preventDefault(); // prevents linebreak
      handleContentSend();
    }
  }

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatContainer}>
        {chats.map((chat, index) => displayChat(chat, index))}
        {loading && <div className={styles.Loader}></div>}
      </div>
      <div className={styles.InputContainer}>
        <textarea
          placeholder="Message Super Airman"
          className={styles.UserInput}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleEnterSubmission}
        />
        <input
          type="image"
          src="/send-icon.png"
          alt=""
          className={styles.SendIcon}
          onClick={handleContentSend}
          disabled={loading}
        />
      </div>
    </div>
  );
}
