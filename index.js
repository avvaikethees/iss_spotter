// this file will require and run the main fetch function

// const { fetchMyIP } = require('./iss')

// fetchMyIP ((error, ip) => {
//   if (error) {
//     console.log ("It didn't work!" , error);
//     return;
//   }
//   console.log ("It worked! Return IP:", ip);
// });s

// const { fetchCoordsByIp } = require('./iss');

// fetchCoordsByIp('192.157.122.213',(error, coords)=> {
//   if (error) {
//     console.log("Getting coordinates with IP didn't work!", error);
//     return;
//   }
//   console.log("Yay! It worked! Return coordinates: ", coords);
// });

// const { fetchISSFlyOverTimes } = require('./iss');
// const mycoords ={ latitude: '49.24800', longitude: '-123.09130'}
// fetchISSFlyOverTimes(mycoords, (error, times) => {
//   if (error) {
//     console.log ("It did not work", error);
//     return;
//   }

//   console.log ("Woohoo! These are the times the spacestation will be over you: ", times);
// })

const printPassTimes = function (times) {
  for (const time of times) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(time.risetime); 
    const duration = time.duration; 
    console.log(`Next pass at ${datetime} for ${duration} seconds`)
  }
}; 

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, times) => {
  if (error) {
    return console.log("It didn't work!", error); 
  }

  printPassTimes(times)
})