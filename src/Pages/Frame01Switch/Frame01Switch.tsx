import * as React from 'react';
import {Switch, Route} from 'react-router-dom';
import * as Comps from '../../moduleLoader';
// import { DefaultButton} from 'office-ui-fabric-react/lib/Button';
// import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';


export class Frame01 extends React.Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = {init: 'init'};
  }
  
  render () {

    return (
      <div className="ms-u-borderBase ms-Grid-col ms-u-sm12 ms-u-md8" >
        <Switch>
          <Route exact path='/' component ={Comps.LandingPage} />
          <Route exact path='/locations' component={Comps.Locations} />
          <Route path='/locations/RestoRomance' component={Comps.RestoRomance} />
          <Route path='/locations/TimeWrap' component={Comps.TimeWrap} />
          <Route path='/locations/HikeAndSmile' component={Comps.HikeAndSmile} />
        </Switch>
      </div>
    );
  }
};