export const actionsType = {
  SEND_MESSAGE: 'SEND_MESSAGE',
  SEND_MESSAGE_WITH_IMAGE: 'SEND_MESSAGE_WITH_IMAGE',
  COMMAND_STARTED: 'COMMAND_STARTED',
  COMMAND_FINISH: 'COMMAND_FINISH'
};

export const commandStarted = () => ({
  type: actionsType.COMMAND_STARTED
});

export const commandFinish = () => ({
  type: actionsType.COMMAND_FINISH
});

export const sendMessage = (content, botName, from) => ({
  type: actionsType.SEND_MESSAGE,
  payload: {
    content,
    botName,
    from
  }
});

export const sendMessageWithImage = (content, botName, from, img) => ({
  type: actionsType.SEND_MESSAGE_WITH_IMAGE,
  payload: {
    content,
    botName,
    from,
    img
  }
});
