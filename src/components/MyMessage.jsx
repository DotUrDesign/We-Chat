const MyMessage = ({message}) => {
    if(message?.attachments?.length > 0){   
        /* If this condition is true, that means my message is an image. */
        return (
            <img 
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{float:'right'}}
            />
        )
    }
    /* Else , my message is a text message. Just return it with some styles. */
    return (
        <div className="message" style={{float:'right' , marginRight:'18px' , color:'white' , backgroundColor:'#3B2A50'}}>
            {message.text}
        </div>
    )
}

export default MyMessage;