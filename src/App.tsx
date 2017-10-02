import * as React from 'react';
import './App.css';
//import './App2.css';
//import './fabric.css';
//require('./App.css');
import * as Comps from './moduleLoader';
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';

loadTheme({
  palette: {
    'themePrimary': 'themePrimary'
  } 
});


//const logo = require('./logo.svg');

class App extends React.Component {
  render() {
    return (
      <div>
      

        <div className="App-wrapper ms-Grid">
          <div className="ms-Grid-row">
            <div className="ms-Grid-col ms-u-sm12 ms-u-borderBase">
              <Comps.Header />
            </div>
          </div>
          <div className="app-body ms-Grid-row ms-u-borderBase">
            <Comps.SideNav />
            <Comps.Frame01 />
            
          </div>
          <div className="app-footer">
          footer
          </div>
        </div>
      </div>
    );
  }
}

export default App;
