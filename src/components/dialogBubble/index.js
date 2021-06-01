import React from 'react';
import './index.css';
import User from '../../assets/user.png';
import Melina from '../../assets/melina.png';
import Pierre from '../../assets/pierre.png';
import Alexandra from '../../assets/alexandra.png';

export default function DialogBubble({
  sender, content, hour, img
}) {
  let bubbleMorpho = null;
  let classNameHour = null;
  let Image = null;
  if (sender === 'User') {
    Image = (<img className="userImage" src={User} alt="" />);
    bubbleMorpho = 'dialogBubbleUser';
    classNameHour = 'hourBoxUser';
  } else {
    bubbleMorpho = 'dialogBubbleBot';
    classNameHour = 'hourBoxBot';
    if (sender === 'Alexandra') {
      Image = (<img className="botImage" src={Alexandra} alt="" />);
    } else if (sender === 'Melina') {
      Image = (<img className="botImage" src={Melina} alt="" />);
    } else if (sender === 'Pierre') {
      Image = (<img className="botImage" src={Pierre} alt="" />);
    }
  }
  return (
    <div className="bubble">
      <div className={`hourBox ${classNameHour}`}>
        <p>{hour}</p>
      </div>
      <div className={`${bubbleMorpho} dialogBubble`}>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        {img ? <img src={img} alt="dog" className="imgIntoBubble" /> : null}
      </div>
      {Image}
    </div>
  );
}
