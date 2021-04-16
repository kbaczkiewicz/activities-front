import React from 'react';
import {getMessages} from "../../service/MessageService";

export const Messages = props => {
    return (
          <div className='row'>
              <div className='col'>
                  {renderMessages(getMessages(props.sessionKey))}
              </div>
          </div>
    );
};

const renderMessages = messages => {
    return messages.map((message, index) => {
        return (<div key={index} className={'alert alert-' + message.type}>{message.content}</div>);
    });
};
