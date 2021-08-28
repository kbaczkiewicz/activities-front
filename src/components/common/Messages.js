import React, {useEffect, useState} from 'react';
import {getMessages} from "../../service/MessageService";

export const Messages = props => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages(messages.length ? messages : getMessages(props.sessionKey));
    }, []);

    return (
          <div className='row'>
              <div className='col'>
                  {renderMessages(messages)}
              </div>
          </div>
    );
};

const renderMessages = messages => {
    return messages.map((message, index) => {
        return (<div key={index} className={'alert alert-' + message.type}>{message.content}</div>);
    });
};
