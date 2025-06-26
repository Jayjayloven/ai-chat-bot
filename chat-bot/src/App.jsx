import { Chat } from "./components/chat/chat";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <section className={styles.Header}>
        <img src="/chat-bot.png" alt="" className={styles.Logo}/>
        <h4 className={styles.Title}>AI CHATBOT</h4>
      </section>
      <Chat></Chat>
    </div>
  );
}

export default App;
