const https = require('https');

const doPostRequest = (event) => {
  const data = {
    value1: 1,
    value2: 2,
  };
    const params = {
//        Bucket: event.Records[0].s3.bucket.name,
        Bucket: "secondbucket.net22.live",
        Key: "334734167946_waflogs_cloudfront_AWSWAFSecurityAutomations_20220925T1555Z_93ee324e.log.log"
    };
    console.log(params.Bucket);

  return new Promise((resolve, reject) => {
    const options = {
      host: 'elk5.es.us-east-1.aws.found.io',
      path: '/waf/_doc',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'ApiKey ODN6SVk0TUJKaGdlMzdEMkJYc1Y6VU1kZ0I4T29TeGF1eDJSakk2QlN3Zw=='
      }
    };
    
    //create the request object with the callback with the result
    const req = https.request(options, (res) => {
      resolve(JSON.stringify(res.statusCode));
    });

    // handle the possible errors
    req.on('error', (e) => {
      reject(e.message);
    });
    
    //do the request
    req.write(JSON.stringify(data));

    //finish the request
    req.end();
  });
};


exports.handler = async (event) => {
  await doPostRequest()
    .then(result => console.log(`Status code: ${result}`))
    .catch(err => console.error(`Error doing the request for the event: ${JSON.stringify(event)} => ${err}`));
};