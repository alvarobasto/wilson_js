const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
  token: 'xoxb-3773856284-396984733107-0bcIExBKQkY4KwhGeniysUWu',
  name: 'wilson'
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  };

  bot.postMessageToChannel(
    'wilson_channel',
    'Oi, eu sou o @wilson! =)',
    params
  );
});

// Error Handler
bot.on('error', err => console.log(err));

// Message Handler
bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});

// Respons to Data
function handleMessage(message) {
  if (message.includes(' chucknorris')) {
    chuckJoke();
  } else if (message.includes(' yomama')) {
    yoMamaJoke();
  } else if (message.includes(' random')) {
    randomJoke();
  } else if (message.includes(' marcello')) {
    runMarcello();
  } else if (message.includes(' leo')) {
    runLeo();
  } else if (message.includes(' iande')) {
    runIande();
  } else if (message.includes(' help')) {
    runHelp();
  }
  
}

// Tell a Chuck Norris Joke
function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random').then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('wilson_channel', `Chuck Norris: ${joke}`, params);
  });
}

// Tell a Yo Mama Joke
function yoMamaJoke() {
  axios.get('http://api.yomomma.info').then(res => {
    const joke = res.data.joke;

    const params = {
      icon_emoji: ':laughing:'
    };

    bot.postMessageToChannel('wilson_channel', `Yo Mama: ${joke}`, params);
  });
}

// Tell a Random Joke
function randomJoke() {
  const rand = Math.floor(Math.random() * 2) + 1;
  if (rand === 1) {
    chuckJoke();
  } else if (rand === 2) {
    yoMamaJoke();
  }
}

// Show Marcello Text
function runMarcello() {
  const params = {
    icon_emoji: ':ok_hand:'
  };

  bot.postMessageToChannel(
    'wilson_channel',
    `E aí Balaum, Blz? :man-surfing:`,
    params
  );
}

// Show Leo Text
function runLeo() {
  const params = {
    icon_emoji: ':mask:'
  };

  bot.postMessageToChannel(
    'wilson_channel',
    `Fiquei sabendo que pra falar com vc tenho que usar uma nurse mask, procede? :thinking_face:`,
    params
  );
}

// Show iande Text
function runIande() {
  const params = {
    icon_emoji: ':sneezing_face:'
  };

  bot.postMessageToChannel(
    'wilson_channel',
    `Fica titi não, daqui a 4 anos tem mais! :soccer: :goal_net:`,
    params
  );
}

// Show Help Text
function runHelp() {
  const params = {
    icon_emoji: ':question:'
  };

  bot.postMessageToChannel(
    'wilson_channel',
    `Escreva @wilson com alguma das palavras 'iande' 'marcello' 'leo' 'chucknorris', 'yomama' ou 'random' para ganhar uma piada :wink:`,
    params
  );
}