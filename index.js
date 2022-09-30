// Load the AWS SDK for Node.js
const https = require("https");
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-1" });
// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
var queueURL = "https://sqs.us-east-1.amazonaws.com/334734167946/sqs-waf-2";

var params = {
  AttributeNames: ["SentTimestamp"],
  MaxNumberOfMessages: 10,
  MessageAttributeNames: ["All"],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0,
};

// var sqsMessage = {
//     value1: 11,
//     value2: 22,
//   };
var sqsMessagess = "";

exports.doGetSqs = () => {
// doGetSqs = () => {
  sqs.receiveMessage(params, function (err, data) {
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {
      // sqsMessage = data.Messages[0].Body;
      return data.Messages[0].body;
      sqsMessagessqsMessage = data.Messages[0].Body;
      var deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      sqs.deleteMessage(deleteParams, function (err, data) {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message read and Deleted", data);
          return "message read and deleted";
        }
      });
    }
  });
  return "message read and deleted";
};

const doPostRequest = (sqsMessages) => {
  const vardata = exports.doGetSqs();
  const dataTest = {
    value1: 11,
    value2: 22,
  };
  return new Promise((resolve, reject) => {
    const options = {
      host: "elk5.es.us-east-1.aws.found.io",
      path: "/waf/_doc",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "ApiKey ODN6SVk0TUJKaGdlMzdEMkJYc1Y6VU1kZ0I4T29TeGF1eDJSakk2QlN3Zw==",
      },
    };

    //create the request object with the callback with the result
    const req = https.request(options, (res) => {
      resolve(JSON.stringify(res.statusCode));
    });

    // handle the possible errors
    req.on("error", (e) => {
      reject(e.message);
    });

    //do the request
    req.write(JSON.stringify(vardata));

    //finish the request
    req.end();
  });
};

exports.handler = async (event) => {
  //   var sqsMessage = await exports.doGetSqs(event);
  //   await exports.doGetSqs(event);
  await doPostRequest(sqsMessagess)
    .then((result) => console.log(`Status code: ${result}`))
    .catch((err) =>
      console.error(
        `Error doing the request for the event: ${JSON.stringify(
          event
        )} => ${err}`
      )
    );
};
