//01stMarch

//03rdMarch
//let AWS = require('aws-sdk');
const getConstant = require('./constant')();
//Favas`
//console.log("Edit")
// const callback = function (err, data) {
// console.log('callback called+++++++++++++++++++++++++++++++++');
// console.log(err, data);
// };
// const event = {
//     "driverDetails": [
//         {
//             "_id": "5c38a05aa84b40680dc43af9",
//             "location": {
//                 "type": "Point",
//                 "coordinates": [
//                     77.7494035,
//                     12.9825939
//                 ]
//             },
//             "settings": {
//                 "ringtone": 1,
//                 "vibration": 1,
//                 "repeat": false,
//                 "language": 1,
//                 "navigation": 1,
//                 "mapStyle": 1,
//                 "showTraffic": false,
//                 "powerSavingModel": false,
//                 "navigationHelper": false,
//                 "transportType": 1
//             },
//             "role": 3,
//             "driverStatus": 1,
//             "isDeleted": 0,
//             "name": "Driver A",
//             "email": "email@gmail.com",
//             "password": "Driver@123",
//             "lastName": "last Name",
//             "notes": "This is notes",
//             "transportDesc": "Car",
//             "kolor": "Red",
//             "licencePlate": "KA-09",
//             "phone": "+91 9066359086",
//             "assignTeam": "5c387872d0b67ae9f460649f",
//             "clientId": "e08cac38-e213-4474-87c6-00764539d649",
//             "cognitoSub": "6c3fb80f-9e15-4223-9bb5-e7a41d33f514",
//             "userRole": 1,
//             "user": "e08cac38-e213-4474-87c6-00764539d649",
//             "driverId": "71245419",
//             "created_at": "2019-01-11T13:55:38.777Z",
//             "__v": 0,
//             "previousStatus": 4,
//             "appVersion": "1.11",
//             "batteryState": 73,
//             "currentAddress": "Bhagath Sing Road, Whitefield, Bengaluru, Karnataka 560066, India\n",
//             "deviceName": "Asus ASUS_Z010D",
//             "deviceToken": "eRxF-zrvKMw:APA91bH1nMOFB6nj6J963aMjE1lbW3fYGlDzQiGoJV8XV6_nsy21XB-Odsb2cmHPL-uqTu0qQHy-5aYSrTDFTbQufHM3AngA7PIJBu7pTtaRv3m3NcZQI0Hva1ZlpMiXmgrBlQM42q12",
//             "endpointArn": "arn:aws:sns:ap-south-1:786724127547:endpoint/GCM/android/c2c653d9-173f-36ac-89e2-102add1f1544"
//         }
//     ]
// }
exports.handler = function (event, context, callback) {
context.callbackWaitsForEmptyEventLoop = false;
  getConstant.then(() => {
    const db = require('./db').connect();
    const notifyFile = require('./notify');
    const result = require('./result');
    console.log(JSON.stringify(event));
    // return db.then(() => notifyFile.sendPushNotification(event.taskDetails,event.endArn,event.flage)).catch((err) => {
    return  db.then(() => {
       // notifyFile.sendPushNotification(event.taskDetails,event.endArn,event.flage)
       return notifyFile.getSoundDetails(event.driverDetails[0],6).then((details)=> {
         console.log('settingsRes',ringtone);
       // var finalSettings = (settingsRes.toObject()) ? settingsRes.toObject() : '';
         return notifyFile.sendPushNotification(event.driverDetails,event.driverDetails[0].endpointArn,details.dynamicTone, details.msgLang).then((res)=> {
            console.log('finally succeded');
            result.sendSuccess(callback,{'msg':'success'});
          })
        })
      }).catch((err) => {
      console.log(err);
      result.sendServerError(callback)
    });
  });
};
