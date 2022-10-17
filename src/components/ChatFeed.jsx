import React from 'react';
import MyMessage from './MyMessage';
import MessageForm from './MessageForm';
import TheirMessage from './TheirMessage';


export const ChatFeed = (props) => {
    const {chats , activeChat,userName , messages} = props;   // destructuring the props.

/* If chats exists , then go to the array chats and find the activeChats from it. */
    const chat = chats && chats[activeChat];   

    // console.log(chat, userName,messages);

    const renderReadReceipts = (message, isMyMessage) => chat.people.map((person, index) => person.last_read === message.id && (
        <div
          key={`read_${index}`}
          className="read-receipt"
          style={{
            float: isMyMessage ? 'right' : 'left',
            backgroundImage: person.person.avatar && `url(${person.person.avatar})`,
          }}
        />
      ));

      /* New functional component for generating messages. */
    const renderMessages = () => {
        const keys = Object.keys(messages);  // keys are just the IDs of the specific messages.
        // console.log(keys);
        return keys.map((key,index) => {
            const message = messages[key];

            /* If there are messages , make sure to find the last message. */
            const lastMessageKey = index === 0 ? null : keys[index - 1];

            const isMyMessage = userName === message.sender.username;

            return (
                <div key={`msg_${index}`} style={{width : '100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage
                            ? <MyMessage message={message}/>
                            : <TheirMessage message={message} lastMessage={messages[lastMessageKey]}/>
                        }
                    </div>
                    <div className="read-receipts" style={{marginRight: isMyMessage ? '18px' : '0px' , marginLeft: isMyMessage ? '0px' : '68px'}} >
                        {renderReadReceipts(message, isMyMessage)}
                    </div>
                </div>
            )
        })
    }

    /* If no chat present... */
    if(!chat) return 'Loading...';

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat?.title}</div>
                {/* The "?." symbol is used to confirm that the chat is present, 
                    before accessing the title variable.  */}
                <div className="chat-subtitle">
                    {chat.people.map((person) => `${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{height: '100px'}} />

            {/* Creating a form where users will be able to send messages. */}
            <div className = "message-form-container">
                <MessageForm {...props} chatId={activeChat}/>
            </div>
        </div>
    )
}

