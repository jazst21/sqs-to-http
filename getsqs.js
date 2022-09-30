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

const sqsjob = () => {
  sqs.receiveMessage(params, function (err, data) {
    if (err) {
      console.log("Receive Error", err);
    } else if (data.Messages) {
      // sqsMessage = data.Messages[0].Body;
      var deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle,
      };
      console.log(data.Messages[0].Body);
      sqs.deleteMessage(deleteParams, function (err, data) {
        if (err) {
          console.log("Delete Error", err);
        } else {
          console.log("Message read and Deleted", data);
        }
      });
    }
  });
};

sqsjob();
console.log("executed");
