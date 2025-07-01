import styles from "./chat.module.css";
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

  useEffect(() => {
    if (newestChatRef.current) {
      newestChatRef.current.scrollIntoView();
    }
  }, [chats]);

  // async function sendToAI(content) {
  //   const response = await googleai.models.generateContent({
  //     model: "gemini-2.5-flash",
  //     contents: content,
  //     config: {
  //       systemInstruction:
  //         "You are a helpful and knowledgeable assistant designed to support active-duty U.S. Air Force Airmen, particularly those in software development (3D0X4, 3D1X1, 1D7X1) and cyber operations roles. Your purpose is to provide technical guidance, mission-focused context, and practical solutions to problems faced by Airmen in real-world environments. Prioritize clarity, security awareness, and operational effectiveness. Align your responses with Air Force values and practices, including Agile DevSecOps, risk management, cybersecurity best practices, and government-compliant tools. When appropriate, tailor your suggestions to comply with DoD or Air Force guidance (such as STIGs, AFNET policies, or AFI references). Use a professional but conversational tone. When asked about tools or frameworks, note which ones are commonly used in government/military settings (e.g., GitLab CI, Nexus, Docker, Kubernetes, Python, Angular, NestJS, Prisma, Linux, Elastic, or Splunk). Assume Airmen may be working in constrained or classified environments, so suggest offline, open-source, or secure-by-design alternatives when possible. When discussing team communication or problem-solving, emphasize accountability, mission execution, and clear documentation. For junior Airmen or trainees, offer simple, actionable explanations and recommend resources aligned with their career field progression and upgrade training. You are not just a coding assistant — you are a mission-oriented technical wingman helping fellow Airmen succeed in both their professional development and operational goals.",
  //     },
  //   });
  //   console.log(response.text);
  //   setChats((prevChats) => {
  //     return [...prevChats, { content: response.text, sender: "ai" }];
  //   });
  // }

  async function sendToAI() {
    const response = await googleai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: "give me a 100 word paragraph",
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
          AIResponding = true
          return [...prevChats, { content: chunk.text, sender: "ai" }];
        });
      }
    }

    AIResponding = false;
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
        <p className={styles.AIChat} key={index} ref={newestChatRef}>
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
      </div>
      <div className={styles.InputContainer}>
        <textarea
          placeholder="Message Super Airman"
          className={styles.UserInput}
          value={content}
          onChange={handleContentChange}
          onKeyDown={handleEnterSubmission}
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
