// this file will contain most of the logic for fetching the data from each API endpoint

/**
 * Makes a single API request to retrieve the users's IP address
 * Input:
 * - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 * - an error, if any (nullable)
 * - the IP address as a string (null if error). Example: "162.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // this error will be set if invalid domain, user is offline, etc
    if (error) {
      return callback(error, null);
    }
    // this error will be set if non 200 status code, assume server error
    // the Error (...) part is an object that we can pass around. We can pass this back to the callback to indicate something went wrong
    if (response.statusCode !== 200) {
      callback(Error("Status Code " + response.statusCode + " when fetching IP:" + body), null);
      return;
    }
    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIp = function(ip, callback) {
  request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = "Status Code " + response.statusCode + " when fetching coordinates: " + body;
      callback(Error(msg), null);
      return;
    }

    const {latitude, longitude } = JSON.parse(body).data;
    callback(null, {latitude, longitude});
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request (`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body)=>{
    if (error) {
      callback (error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = "Status Code " + response.statusCode + " when fetching times: " + body;
      callback(Error(msg), null);
      return;
    }

    const times = JSON.parse(body).response

    callback(null, times)
  } )
};

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 

const nextISSTimesForMyLocation = function (callback) {

  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIp(ip, (error, coords) => {
      if (error) {
        return callback (error, null); 
      }

      fetchISSFlyOverTimes(coords, (error, times) => {
        if (error) {
          return callback (error, null);
        }

        callback(null, times);
      });
    });
  });
};

module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIp };
module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation }

