import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';

const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds } = props;   // destructure

  const handleChange = (event) => {
    setValue(event.target.value);

    isTyping(props, chatId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();   
    /* This will make sure that it will not do a browser refresh ,
     once you submit the form. */

    const text = value.trim();  
    /* Trim removes the leading and trailing white 
    spaces and line terminator characters from a string. */

    if (text.length > 0) {
      sendMessage(creds, chatId, { text });  
      /* This is an in-built function fetched from React-Chat-Engine which 
      accepts 3 props - creds , chatId and the message-text. */
    }

    setValue('');  /* After sending the message , the input will be set to NULL. */
  };

  // This function is called when we have to send an image or a file.
  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />  
          {/* This is the label for sending image. */}
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;