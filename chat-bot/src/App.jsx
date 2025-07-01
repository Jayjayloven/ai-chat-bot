import { GoogleGenAI } from "@google/genai";
import styles from "./App.module.css";
import { Chat } from "./components/chat/chat";
import { useEffect } from "react";




function App() {
  return (
    <div className={styles.App}>
      <section className={styles.Header}>
        <img src="/chat-bot.png" alt="" className={styles.Logo} />
        <h4 className={styles.Title}>AI SUPER AIRMAN</h4>
      </section>
      <Chat></Chat>
    </div>
  );
}

export default App;
