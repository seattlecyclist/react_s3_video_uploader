import React from 'react';
import {render} from 'react-dom';

class UploadForm extends React.Component {
  render() {
    return (
      <div>
        <form action='https://s3-bucket.s3.amazonaws.com/' method='post' encType='multipart/form-data'>
          <input type="hidden" name="key" value="" />
          <input type="hidden" name="AWSAccessKeyId" value="YOUR_AWS_ACCESS_KEY" />
          <input type="hidden" name="acl" value="private" />
          <input type="hidden" name="success_action_redirect" value="http://localhost/" />
          <input type="hidden" name="policy" value="YOUR_POLICY_DOCUMENT_BASE64_ENCODED" />
          <input type="hidden" name="signature" value="YOUR_CALCULATED_SIGNATURE" />
          <input type="hidden" name="Content-Type" value="image/jpeg" />

          File to upload to S3:
          <input name="file" type="file" />
          <br />
          <input type="submit" value="Upload File to S3" />

        </form>
      </div>
    );
  }
}

export default UploadForm;