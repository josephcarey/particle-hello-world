if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const Particle = require('particle-api-js');
const particle = new Particle();
let token;

particle
  .login({
    username: process.env.PARTICLE_USERNAME,
    password: process.env.PARTICLE_PASSWORD,
  })
  .then(data => {
    token = data.body.access_token;

    console.log('token:', token);

    // let devicesPr = particle.listDevices({ auth: token });

    // devicesPr.then(
    //   function(devices) {
    //     console.log('Devices: ', devices);
    //   },
    //   function(err) {
    //     console.log('List devices call failed: ', err);
    //   }
    // );

    sendMessage('Hello World');
  })
  .catch(error => {
    console.log('Could not log in to Particle:');
    console.log(error);
  });

// console.log('un:', process.env.PARTICLE_USERNAME);
// console.log('pw:', process.env.PARTICLE_PASSWORD);

const morseCode = {
  a: '._',
  b: '_...',
  c: '_._.',
  d: '_..',
  e: '.',
  f: '.._.',
  g: '__.',
  h: '....',
  i: '..',
  j: '.____',
  k: '_._',
  l: '._..',
  m: '__',
  n: '_.',
  o: '___',
  p: '.__.',
  q: '__._',
  r: '._.',
  s: '...',
  t: '_',
  u: '.._',
  v: '..._',
  w: '.__',
  x: '_.._',
  y: '_.__',
  z: '__..',
  1: '.___',
  2: '..___',
  3: '...__',
  4: '...._',
  5: '.....',
  6: '_....',
  7: '__...',
  8: '___..',
  9: '____.',
  0: '_____',
};

getMorse = letter => {
  if (letter === ' ') {
    return '|';
  }
  return morseCode[letter.toLowerCase()] + ' ';
};

sendMessage = async message => {
  console.log('message:', message);

  let morseMessage = message.split('').reduce((endResult, currentChar) => {
    console.log('currentChar:', currentChar);
    return endResult + getMorse(currentChar);
  }, '');

  console.log('Morse message:', morseMessage);

  for (let currentMorse of morseMessage) {
    if (currentMorse === '.') {
      console.log('.');
      await particle
        .callFunction({
          deviceId: '430039001051373331333230',
          name: 'singleMorse',
          argument: 'dot',
          auth: token,
        })
        .catch(error => {
          console.log('error:', error);
        });
    }

    if (currentMorse === '_') {
      console.log('_');
      await particle
        .callFunction({
          deviceId: '430039001051373331333230',
          name: 'singleMorse',
          argument: 'dash',
          auth: token,
        })
        .catch(error => {
          console.log('error:', error);
        });
    }
  }
};

newSendMessage = message => {
  console.log('message:', message);

  let morseMessage = message.split('').reduce((endResult, currentChar) => {
    console.log('currentChar:', currentChar);
    return endResult + getMorse(currentChar);
  }, '');

  console.log('Morse message:', morseMessage);

  particle
    .callFunction({
      deviceId: '430039001051373331333230',
      name: 'morseMessage',
      argument: morseMessage,
      auth: token,
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log('error:', error);
    });
};
