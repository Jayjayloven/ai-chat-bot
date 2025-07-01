import styles from "./sidebar.module.css"


export function Sidebar(){
    const temp = [{chatName: "TEST1"} , {chatName: "TEST2"}, {chatName: "TEST2"}, {chatName: "TEST2"}]
    return (
        <div className={styles.ChatContainer}>
            <button className={styles.NewChatButton} >NEW CHAT</button>
            {temp.map((chat,index)=> <option key={index} className={styles.PrevChatButton}> {chat.chatName}</option>)}
        </div>
    )
}