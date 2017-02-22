import React from 'react';
import {render} from 'react-dom';

class UploadForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      file: 'Test'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileChanged = this.fileChanged.bind(this);
  }

  render() {
    return (
      <div>
        <img id="preview" src=""/>
        <form action='https://s3-bucket.s3.amazonaws.com/'
              method='post'
              encType='multipart/form-data'
              onSubmit={this.handleSubmit}>

          File to upload to S3:
          <input name="file" type="file" onChange={this.fileChanged}/>
          <br />
          <input type="submit" value="Upload File to S3" />
        </form>
      </div>
    );
  }

  fileChanged(event) {
    this.state.file = event.target.files[0];
  }

  handleSubmit(event) {
    event.preventDefault();

    if(this.state.file == null){
      return alert('No file selected.');
    }

    this.getSignedRequest(this.state.file);
    return false;
  }

  getSignedRequest(file) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/s3/sign?file-name=${file.name}&file-type=${file.type}`);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          console.log("Got signed response success:", xhr.responseText);
          const response = JSON.parse(xhr.responseText);
          this.uploadFileToS3(file, response.signedRequest, response.url);
        }
        else{
          console.log("Error", xhr);
          alert('Could not get signed URL.');
        }
      }
    };

    xhr.send();
  }

  uploadFileToS3(file, signedRequest, url) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4){
        if(xhr.status === 200){
          document.getElementById('preview').src = url;
        }
        else{
          alert('Could not upload file to s3.');
        }
      }
    };
    xhr.send(file);
  }
}

export default UploadForm;