const { nextISSTimeForMyLocation } = require('./iss_promised.js')

// calling the function fetchMyIP which is laid out in iss_promised file
// this function RETURNS A PROMISE
// we are then calling .THEN on its RETURN VALUE
// the .THEN call should take in a CALLBACK which accepts the response body

// fetchMyIP ()
//   .then(fetchCoordsByIP)
//   .then (fetchISSFlyOverTimes)
//   .then(body => console.log(body));

const printPassTimes = function (times) {
  for (const time of times) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime); 
    const duration = time.duration; 
    console.log(`Next pass at ${datetime} for ${duration} seconds`)
  }
}; 

  nextISSTimeForMyLocation()
    .then((passTimes) => {
      printPassTimes(passTimes);
    })
    .catch((error) => {
      console.log("It didn't work: ", error.message);
    });
