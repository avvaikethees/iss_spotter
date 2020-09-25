const request = require ('request');

request('https://ipvigilante.com/8.8.8.8', (error, response, body) => {
  const {latitude, longitude } = JSON.parse(body).data;
    console.log({latitude, longitude});
})