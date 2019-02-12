let AWS = require('aws-sdk');
const momentTimeZone = require('moment-timezone');
const constantAWS = require('./constant')();
const driverModel = require('./model');
const mongoose = require('mongoose');
const rignToneArr = require('./iosRignTone').rignTone;// AWS.config.update({
//   signatureVersion: 'v4',
//   "accessKeyId": constantAWS[accessKeyId],
//   "secretAccessKey": constantAWS[secretAccessKey],
//   region: 'ap-south-1'
// });
let sns = new AWS.SNS();
module.exports = {
  sendPushNotification: notify,
  getSoundDetails: getSound
};


function notify(data, end_point_arn, dynamicTone, msgLanguage) {
  console.log('data', data);

  // let d = new Date(data.date);
  // let tz = (data.timezone) ? data.timezone : 'Asia/Calcutta';
  // let m = momentTimeZone.utc(d, "YYYY-MM-DD h:mm:ss A");
  // d = m.tz(tz).format("YYYY-MM-DD h:mm:ss A");
  // let nStart = d.toString();
  // let startArry = [];
  // startArry = nStart.split(' ');
  // let startTime = startArry[1] + ' ' + startArry[2];
  // let Startdate = startArry[0];
  // console.log('startArry', startArry);
  // console.log('statArry', startArry[1], startArry[2]);
  // let endDate = null;
  // let endTime = null;
  // let auto = 0;
  // if (data.endDate) {
  //   let e = new Date(data.endDate);
  //   let m = momentTimeZone.utc(e, "YYYY-MM-DD h:mm:ss A");
  //   e = m.tz(tz).format("YYYY-MM-DD h:mm:ss A");
  //   let nEnd = e.toString();
  //   let endArry = [];
  //   endArry = nEnd.split(' ');
  //   endTime = endArry[1] + ' ' + endArry[2];
  //   endDate = endArry[0];
  // } else {
  //   endDate = '';
  //   endTime = '';
  // }
  // let _id = data._id;
  // console.log('status', flag);
  // let status = flag;
  let jsonMessage;
    let iosPubParam = end_point_arn.split('/')[1];
  // let acknowledgementType = data.settings.acknowledgementType;
  // let businessType = data.businessType;
  // let taskStatus = data.taskStatus;
  // let CustomerName = data.name,
  //   OrderId = (data.orderId) ? (data.orderId) : '',
  //   CustomerAddress = data.address.formatted_address;
  // let isPickUp = (data.isPickup) ? true : false;
  // console.log('acknowledgeType', acknowledgementType);

 // if (status === 1) {

    (iosPubParam == "GCM") ? jsonMessage = {"default": msgLanguage, "GCM": "{\"delay_while_idle\":true,\"collapse_key\":\"Welcome\",\"data\":{\"status\":\"25\",\"title\":\"" + msgLanguage + "\"},\"time_to_live\":125,\"dry_run\":false}",} : jsonMessage = {"default": msgLanguage, [iosPubParam]: "{ \"aps\": { \"alert\": \"" + msgLanguage + "\"  , \"sound\": \"" + dynamicTone + "\", \"mutable-content\": \"1\", \"data\":{\"status\":\"25\",\"title\":\"" + msgLanguage + "\"}}}"}
  // } else if (status === 2) {
  //   jsonMessage = {
  //     "default": "Task is updated",
  //     "GCM": "{\"delay_while_idle\":true,\"collapse_key\":\"Welcome\",\"data\":{\"OrderId\":\"" + OrderId + "\",\"status\":\"" + status + "\",\"taskStatus\":\"" + taskStatus + "\",\"businessType\":\"" + businessType + "\",\"acknowledgementType\":\"" + acknowledgementType + "\",\"_id\":\"" + _id + "\",\"CustomerName\":\"" + CustomerName + "\",\"CustomerAddress\":\"" + CustomerAddress + "\",\"startTime\":\"" + startTime + "\",\"Startdate\":\"" + Startdate + "\",\"endTime\":\"" + endTime + "\",\"endDate\":\"" + endDate + "\",\"title\":\"Task is updated\",\"isPickUp\":\"" + isPickUp + "\",\"auto\":\" " + auto + "\"},\"time_to_live\":125,\"dry_run\":false}",
  //     "APNS_SANDBOX": "{ \"aps\": { \"alert\": \"Task is updated\" , \"sound\": \"" + dynamicTone + "\",\"mutable-content\": \"1\", \"_id\": \"" + _id + "\",\"taskStatus\": \"" + taskStatus + "\",\"status\":\"" + status + "\",\"OrderId\":\"" + OrderId + "\",\"businessType\":\"" + businessType + "\",\"acknowledgementType\":\"" + acknowledgementType + "\",\"CustomerName\":\"" + CustomerName + "\",\"CustomerAddress\":\"" + CustomerAddress + "\",\"startTime\":\"" + startTime + "\",\"Startdate\":\"" + Startdate + "\",\"endTime\":\"" + endTime + "\",\"endDate\":\"" + endDate + "\",\"isPickUp\":\"" + isPickUp + "\",\"title\":\"Task is updated\",\"auto\":\"" + auto + "\" }}"
  //   }
  // } else if (status === 3) {
  //   jsonMessage = {
  //     "default": "Task is deleted",
  //     "GCM": "{\"delay_while_idle\":true,\"collapse_key\":\"Welcome\",\"data\":{\"OrderId\":\"" + OrderId + "\",\"status\":\"" + status + "\",\"taskStatus\":\"" + taskStatus + "\",\"businessType\":\"" + businessType + "\",\"acknowledgementType\":\"" + acknowledgementType + "\",\"_id\":\"" + _id + "\",\"CustomerName\":\"" + CustomerName + "\",\"CustomerAddress\":\"" + CustomerAddress + "\",\"startTime\":\"" + startTime + "\",\"Startdate\":\"" + Startdate + "\",\"endTime\":\"" + endTime + "\",\"endDate\":\"" + endDate + "\",\"title\":\"Task is deleted\",\"isPickUp\":\"" + isPickUp + "\",\"auto\":\" " + auto + "\"},\"time_to_live\":125,\"dry_run\":false}",
  //     "APNS_SANDBOX": "{ \"aps\": { \"alert\": \"Task is deleted\" , \"sound\": \"" + dynamicTone + "\",\"mutable-content\": \"1\", \"_id\": \"" + _id + "\",\"taskStatus\": \"" + taskStatus + "\",\"status\":\"" + status + "\",\"OrderId\":\"" + OrderId + "\",\"businessType\":\"" + businessType + "\",\"acknowledgementType\":\"" + acknowledgementType + "\",\"CustomerName\":\"" + CustomerName + "\",\"CustomerAddress\":\"" + CustomerAddress + "\",\"startTime\":\"" + startTime + "\",\"Startdate\":\"" + Startdate + "\",\"endTime\":\"" + endTime + "\",\"endDate\":\"" + endDate + "\",\"isPickUp\":\"" + isPickUp + "\",\"title\":\"Task is deleted\",\"auto\":\"" + auto + "\" }}"
  //   }
  //}


  console.log('json Message', jsonMessage);

  return new Promise((resolve, reject) => {
    sns.publish({
      Message: JSON.stringify(jsonMessage),      // Required
      MessageStructure: 'json',
      TargetArn: end_point_arn // Required
    }, function (err, data) {
      if (err) {
        console.log('error in sns', err);
        resolve();
      }

      console.log('push sent');
      console.log(data);
      resolve();
    });

  });

}

function getSound(driverDetails,flag) {
    return new Promise((resolve, reject) => {
        var dynamicTone;
        var msgLang;
        if (driverDetails.driver) {
            console.log(driverDetails.driver);
            return driverModel.findOne({_id: mongoose.Types.ObjectId(driverDetails.driver)}, {
                settings: 1,
                _id: 0
            }).then((result) => {
                console.log(result);
                var finalRes = (result.toObject()) ? result.toObject() : result;
                return localeModel.findOne({status: flag}, {_id: 0}).then((langRes) => {
                    console.log(langRes.toObject());
                    var langKey = (finalRes.settings.language == 2) ? 'es' : 'en';
                    msgLang = (langRes.toObject()) ? langRes.toObject()[langKey] : langRes[langKey];
                    for (let key in rignToneArr) {
                        if (key == finalRes.settings.ringtone) {
                            dynamicTone = rignToneArr[key].name;
                            console.log(dynamicTone);
                            resolve(Object.assign({}, {dynamicTone: dynamicTone, msgLang: msgLang}));
                        }
                    }
                })
            })
        } else {
            dynamicTone = "";
            msgLang = "";
            resolve(Object.assign({}, {dynamicTone: dynamicTone, msgLang: msgLang}));
        }
    });
//  return driverModel.findOne({_id:mongoose.Types.ObjectId(taskDetails.driver)},{settings:1, _id :0});
}







