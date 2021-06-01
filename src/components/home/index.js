import React, { useState } from 'react';
import ContactCard from '../contactCard/index';
import userImage from '../../assets/user.png';
import './index.css';
import DialogWindow from '../dialogWindow/index';

export default function Home() {
  const [dialogBoxIsVisible, setDialogBoxIsVisible] = useState(false);
  const [botName, setBotName] = useState(null);

  const openDialogBox = (botClicked) => {
    setDialogBoxIsVisible(true);
    setBotName(botClicked);
  };

  const closeDialogBox = () => {
    setDialogBoxIsVisible(false);
  };

  return (
    <div>
      {dialogBoxIsVisible ? (<DialogWindow func={closeDialogBox} botName={botName} />) : null}
      <div id="homeGrid">
        <div id="homeGridChild">
          <img id="homePageUserImg" src={userImage} alt="user" />
          <p>
            Hi dear user
            <span> (yeah that&apos;s you)</span>
            , you can select one of the bots and chat with it :
          </p>
          <ContactCard name="Melina" func={() => { openDialogBox('Melina'); }} />
          <ContactCard name="Pierre" func={() => { openDialogBox('Pierre'); }} />
          <ContactCard name="Alexandra" func={() => { openDialogBox('Alexandra'); }} />
        </div>
        <footer>
          <p>Made with yummy choclate danette 🤤</p>
        </footer>
      </div>
    </div>
  );
}
