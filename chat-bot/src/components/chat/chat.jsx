import styles from "./chat.module.css";
import { useState } from "react";

export function Chat() {
  const tempChats = export const temporaryChats = [
  { message: "Hey there!", sender: "user" },
  { message: "Hello! How can I assist you today?", sender: "ai" },
  { message: "What's the weather like today?", sender: "user" },
  { message: "It's sunny with a high of 82°F.", sender: "ai" },
  { message: "Remind me to call my mom.", sender: "user" },
  { message: "Got it! Reminder set for later today.", sender: "ai" },
  { message: "What's 23 times 47?", sender: "user" },
  { message: "23 × 47 is 1081.", sender: "ai" },
  { message: "Nice.", sender: "user" },
  { message: "Glad to help 😄", sender: "ai" },
  { message: "Can you draft a thank-you message?", sender: "user" },
  { message: "Sure! 'Thank you for your support and kindness.'", sender: "ai" },
  { message: "Make it more casual.", sender: "user" },
  { message: "Okay: 'Thanks a ton for everything!'", sender: "ai" },
  { message: "Perfect.", sender: "user" },
  { message: "Glad it works for you!", sender: "ai" },
  { message: "Tell me a joke.", sender: "user" },
  { message: "Why don’t skeletons fight each other? They don’t have the guts.", sender: "ai" },
  { message: "Haha that’s a good one.", sender: "user" },
  { message: "I have plenty more where that came from!", sender: "ai" },
  { message: "Remind me to stretch every hour.", sender: "user" },
  { message: "Stretch reminders now active. 💪", sender: "ai" },
  { message: "Set a timer for 15 minutes.", sender: "user" },
  { message: "Timer set for 15 minutes ⏲️", sender: "ai" },
  { message: "Thanks!", sender: "user" },
  { message: "You got it!", sender: "ai" },
  { message: "Can you explain photosynthesis?", sender: "user" },
  { message: "Sure! It's how plants convert sunlight into energy.", sender: "ai" },
  { message: "That's helpful.", sender: "user" },
  { message: "Anytime!", sender: "ai" },
  { message: "Translate 'good morning' to French.", sender: "user" },
  { message: "'Good morning' in French is 'Bonjour'.", sender: "ai" },
  { message: "What's the capital of Norway?", sender: "user" },
  { message: "The capital of Norway is Oslo.", sender: "ai" },
  { message: "Play some chill music.", sender: "user" },
  { message: "Here’s a chill playlist for you 🎧", sender: "ai" },
  { message: "Can you summarize this article?", sender: "user" },
  { message: "Sure, please paste the article.", sender: "ai" },
  { message: "Here it is: [link]", sender: "user" },
  { message: "Got it. Reading now...", sender: "ai" },
  { message: "Thanks again.", sender: "user" },]
;
  const [chats, setChats] = useState(tempChats);

  function displayChat(chat){
    if (chat.sender === "user") {return <div className={styles.UserChat}> {chat.message} </div>
    }
    if (chat.sender === "ai") {return <div className={styles.AIChat}> {chat.message} </div>
    }
  }

  return (
    <div className={styles.Chat}>
      <div className={styles.ChatContainer}>
        {chats.map((chat, index) => displayChat(chat))}
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
