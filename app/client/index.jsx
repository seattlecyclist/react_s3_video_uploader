import React from 'react';
import {render} from 'react-dom';
import UploadForm from './UploadForm.jsx';

class App extends React.Component {
  render () {
    return <UploadForm/>;
  }
}

render(<App/>, document.getElementById('app'));