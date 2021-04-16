import {Message} from "../models/models";

export const getMessages = key => {
    const messages = sessionStorage.getItem(`messages-${key}`) ? sessionStorage.getItem(`messages-${key}`) : '[]';
    clearMessages(key);

    return JSON.parse(messages).map(message => new Message(message.type, message.content));
};

export const addMessage = (key, message) => {
    const messages = JSON.parse(sessionStorage.getItem(`messages-${key}`) ? sessionStorage.getItem(`messages-${key}`) : '[]');
    messages.push(message);
    sessionStorage.setItem(
        `messages-${key}`,
        JSON.stringify(messages.map(message => {
                return {
                    type: message.type, content: message.content
                };
            })
        )
    );
};

const clearMessages = key => {
    sessionStorage.removeItem(`messages-${key}`);
};
