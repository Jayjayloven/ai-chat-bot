import styles from "./App.module.css";
import { Chat } from "./components/chat/chat";
import { Sidebar } from "./components/Sidebar/sidebar";

function App() {
  return (
    <div className={styles.App}>
      <section className={styles.Header}>
        <img src="/chat-bot.png" alt="" className={styles.Logo} />
        <h4 className={styles.Title}>AI SUPER AIRMAN</h4>
      </section>
      <div className={styles.Main}>
      <Sidebar></Sidebar>
      <Chat></Chat>
      </div>
    </div>
  );
}

export default App;
