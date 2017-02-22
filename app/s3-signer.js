const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');

router.get('/sign', (req, res) => {
  // need to specify the region of my bucket
  aws.config.update({region: 'us-west-2'});
  const s3 = new aws.S3();
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];

  s3.config.region = 'us-west-2';

  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `http://${process.env.S3_BUCKET}.s3-us-west-2.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

module.exports = router;