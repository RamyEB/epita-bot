import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendMessage } from './action';

export default function SendButton({ botName }) {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const SendAndResetInput = () => {
    if (content.trim() !== '') {
      dispatch(sendMessage(content, botName, 'User'));
      setContent('');
    }
  };

  const handleChangeInput = (e) => setContent(e.target.value);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      SendAndResetInput();
    }
  };

  const handleClickButton = () => {
    SendAndResetInput();
  };

  return (
    <div id="inputBox">
      <input type="text" placeholder="/help" value={content} onChange={handleChangeInput} onKeyDown={handleKeyDown} />
      <button type="button" onClick={handleClickButton} onKeyDown={handleKeyDown}>Send</button>
    </div>
  );
}
