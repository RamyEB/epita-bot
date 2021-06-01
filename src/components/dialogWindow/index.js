import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CgCloseO } from 'react-icons/cg/';
import './index.css';
import DialogBubble from '../dialogBubble/index';
import SendButton from './button';

export default function DialogWindow({ func, botName }) {
  const conversation = useSelector((state) => state.data[botName]);
  const { loading } = useSelector((state) => state.data);
  useEffect(() => {
    const element = document.getElementById('dialogBox');
    element.scrollTop = element.scrollHeight;
    return () => {
      element.scrollTop = element.scrollHeight;
    };
  });

  return (
    <div id="dialogWindow">
      <div id="dialogWindowHeader">
        <p>{conversation.bot}</p>
        <CgCloseO className="App-logo" onClick={func} />
      </div>
      <div id="dialogBox">
        {
          conversation.conversation.map(
            (convo) => {
              const {
                sender, date, content, img
              } = convo;
              const index = Math.random();
              return (
                <DialogBubble
                  key={index}
                  sender={sender}
                  hour={date}
                  content={content}
                  img={img}
                />
              );
            }
          )
        }
        { loading ? <DialogBubble sender={conversation.bot} hour={`${conversation.bot} is typing`} content="..." /> : null}
      </div>
      <SendButton botName={botName} />
    </div>
  );
}
