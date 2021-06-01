import React from 'react';
import './index.css';
import Melina from '../../assets/melina.png';
import Pierre from '../../assets/pierre.png';
import Alexandra from '../../assets/alexandra.png';

export default function ContactCard({ name, func }) {
  let Image = null;
  if (name === 'Melina') {
    Image = Melina;
  } else if (name === 'Pierre') {
    Image = Pierre;
  } else if (name === 'Alexandra') {
    Image = Alexandra;
  }

  return (
    <button className="contactCard" onClick={func} type="button">
      <img src={Image} alt="taxi" />
      <div>
        <h3>{name}</h3>
      </div>
    </button>
  );
}
