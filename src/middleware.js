import axios from 'axios';
import {
  sendMessage, commandStarted, commandFinish, sendMessageWithImage
} from './components/dialogWindow/action';

function fetchWeather(botName, city) {
  return (dispatch) => {
    dispatch(commandStarted());
    axios.get(`https://goweather.herokuapp.com/weather/${city}`)
      .then((response) => {
        setTimeout(() => {
          dispatch(commandFinish());
          dispatch(sendMessage(`At ${city} the weather is ${response.data.description} with ${response.data.temperature}`, botName, botName));
        }, 1000);
      })
      .catch((error) => {
        dispatch(commandFinish());
        dispatch(sendMessage(error.message, botName, botName));
      });
  };
}

function fetchNextLaunchSpaceX(botName) {
  return (dispatch) => {
    dispatch(commandStarted());
    axios.get('https://api.spacexdata.com/v4/launches/next')
      .then((response) => {
        let dateUtc = response.data.date_utc;
        const d = new Date(dateUtc);
        dateUtc = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`;
        if (response.data.rocket !== null) {
          axios.get(`https://api.spacexdata.com/v4/rockets/${response.data.rocket}`)
            .then((response2) => {
              const rocket = response2.data.name;
              const txt = `SpaceX's next launch is scheduled for the ${dateUtc} with the rocket named ${rocket}.`;
              const img = response2.data.flickr_images[0];
              setTimeout(() => {
                dispatch(commandFinish());
                if (img) {
                  dispatch(sendMessageWithImage(txt, botName, botName, img));
                } else {
                  dispatch(sendMessage(txt, botName, botName));
                }
              }, 1000);
            })
            .catch((error2) => {
              dispatch(commandFinish());
              dispatch(sendMessage(error2.message, botName, botName));
            });
        } else {
          setTimeout(() => {
            dispatch(commandFinish());
            dispatch(sendMessage(`SpaceX's next launch is scheduled for ${dateUtc}`, botName, botName));
          }, 1000);
        }
      })
      .catch((error) => {
        dispatch(commandFinish());
        dispatch(sendMessage(error.message, botName, botName));
      });
  };
}

function fetchFoxPicture(botName) {
  return (dispatch) => {
    dispatch(commandStarted());
    axios.get('https://randomfox.ca/floof/')
      .then((response) => {
        setTimeout(() => {
          dispatch(commandFinish());
          dispatch(sendMessageWithImage('', botName, botName, response.data.image));
        }, 1000);
      })
      .catch((error) => {
        dispatch(commandFinish());
        dispatch(sendMessage(error.message, botName, botName));
      });
  };
}

function time() {
  const actualDate = new Date();
  return actualDate.toLocaleTimeString().slice(0, -3);
}

function help(object) {
  let helpString = '';
  let botString = '';
  Object.keys(object).forEach((key) => {
    if (botString !== object[key].bot) {
      botString = object[key].bot;
      helpString += '<br />';
      helpString += `${object[key].bot} : <br />`;
      helpString += `${object[key].command} : ${object[key].description} <br />`;
    } else {
      helpString += `${object[key].command} : ${object[key].description} <br />`;
    }
  });
  return helpString;
}

const listCommand = {
  time: {
    command: '/time',
    bot: 'All',
    description: 'Cammand that give you the actual time UTC.',
    function: (botName) => sendMessage(`It is now ${time()}`, botName, botName)
  },
  help: {
    command: '/help',
    bot: 'All',
    description: 'List of commands.',
    function: (botName) => sendMessage(help(listCommand), botName, botName)
  },
  name: {
    command: '/name',
    bot: 'Melina',
    description: 'Melina give you her name.',
    function: (botName) => sendMessage('My name is Melina.', botName, botName)
  },
  weather: {
    command: '/weather',
    bot: 'Melina',
    description: 'Actual weather at Paris.',
    function: (botName) => fetchWeather(botName, 'Paris')
  },
  age: {
    command: '/age',
    bot: 'Pierre',
    description: 'Pierre give you his age.',
    function: (botName) => sendMessage("I'm 21 years old.", botName, botName)
  },
  launch: {
    command: '/launch',
    bot: 'Pierre',
    description: 'Next launch of SpaceX with image of the rocket.',
    function: (botName) => fetchNextLaunchSpaceX(botName)
  },
  city: {
    command: '/city',
    bot: 'Alexandra',
    description: 'Alexandra tell you where she live.',
    function: (botName) => sendMessage('I live in Toronto.', botName, botName)
  },
  fox: {
    command: '/fox',
    bot: 'Alexandra',
    description: 'Random fox image.',
    function: (botName) => fetchFoxPicture(botName)
  }
};

export default function middleware(storeAPI) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      switch (action.type) {
        case 'SEND_MESSAGE': {
          if (action.payload.from === 'User' && action.payload.content.substr(0, 1) === '/') {
            next(action);
            const { botName } = action.payload;
            try {
              const command = action.payload.content.substring(1);
              const commandFunction = listCommand[command].function;
              if (action.payload.botName === listCommand[command].bot || listCommand[command].bot === 'All') {
                setTimeout(() => {
                  storeAPI.dispatch(commandFunction(botName));
                }, 1000);
              } else {
                throw new Error('Wrong bot');
              }
            } catch (err) {
              storeAPI.dispatch(sendMessage('Wrong command. Please check /help', botName, botName));
            }
          } else {
            next(action);
          }
          break;
        }
        default:
          next(action);
      }
    };
  };
}
