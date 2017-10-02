import * as React from 'react';
import {Redirect} from 'react-router-dom';
import { DefaultButton} from 'office-ui-fabric-react/lib/Button';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

import {
  GroupedList,
//  IGroup,
  IGroupDividerProps
} from 'office-ui-fabric-react/lib/components/GroupedList/index';
// import { DetailsRow } from 'office-ui-fabric-react/lib/components/DetailsList/DetailsRow';


// Object.defineProperty(exports, "__esModule", { value: true });
// var Utilities_1 = require("office-ui-fabric-react/lib/Utilities");
/*
var getCustomSplitButtonStyles = Utilities_1.memoizeFunction(function () {
    return {
        root: { color: 'red'}
    };
});
*/

const getCustomSplitButtonStyles : IButtonStyles = {
    root: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    rootHovered: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    rootPressed: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    rootFocused: {color: '#f8f8f8', backgroundColor: '#3c3c3c'} 
};


// declare const getCustomSplitButtonStyles: () => IButtonStyles;


export class LinkList extends React.Component<any,any> {
  constructor(props: any) {
    super(props);
    
    this.state = {init: 'init'};
    Object.assign(this.state, {linkToLocationsResetter: false});
    Object.assign(this.state, {appLinksTrigger: null});
    Object.assign(this.state, {mobileBar: false});
    
    this.onClickRedirectToLink = this.onClickRedirectToLink.bind(this);
    //this.goToLandingPage = this.goToLandingPage.bind(this);
    //this.goToLocationsPage = this.goToLocationsPage.bind(this);
  };

  onClickRedirectToLink(target:any) { this.setState( {appLinksTrigger : target} ); };
  
  componentDidUpdate() {
    this.state.appLinksTrigger !== null && (() =>  this.setState (
          (prevState:any, props:any) => (
            { appLinksTrigger : null }
          ) 
        ) 
      )();
  }
  
  private _onRenderCell (nestingDepth: number, item: any, itemIndex: number) {
    
    return (
      <div data-selection-index= { itemIndex } >
        <DefaultButton onClick={item.callback} text={item.name} styles={getCustomSplitButtonStyles} className="ms-Grid-col ms-u-sm12" />
      </div>
    );
  }
  
  private _onRenderHeader(props: IGroupDividerProps): JSX.Element {
    const toggleCollapse = (): void => {
      props.onToggleCollapse!(props.group!);
    };

    //const goToLandingPage = () => (this.onClickRedirectToLink('/'));
    const goToLocationsPage = () => (this.onClickRedirectToLink('/'));
    
    return (
      <div>
        {props.group!.isCollapsed ? 
          <div>
            <DefaultButton onClick={goToLocationsPage} text="Locations" styles={getCustomSplitButtonStyles} className="ms-Grid-col ms-u-sm12" />
            <span onClick={ toggleCollapse }> +</span>
          </div>
        :
          <div>
            <DefaultButton onClick={goToLocationsPage} text="Locations" styles={getCustomSplitButtonStyles} className="ms-Grid-col ms-u-sm12" />
            <span onClick={ toggleCollapse } > -</span>
          </div>
        }
      </div>
        
    );
  }
  
  public render() {
    
    const landingPage = () => (this.onClickRedirectToLink('/'));
    const locationsPage = () => (this.onClickRedirectToLink('/locations'));
   
    
    return(
      <div className="ms-Grid-row">
        <DefaultButton onClick={landingPage} text="Landing Page" styles={getCustomSplitButtonStyles} className="ms-Grid-col ms-u-sm12" />
        <DefaultButton onClick={locationsPage} text="Locations" styles={getCustomSplitButtonStyles} className="ms-Grid-col ms-u-sm12" />
        <GroupedList 
          ref='groupedList'
          onRenderCell = {this._onRenderCell}
          items = {[
            {name:'item1', callback: landingPage},
            {name: 'item2', callback: locationsPage},
            {name:'item3', callback: landingPage},
            {name: 'item4', callback: locationsPage},
            {name: 'item5', callback: landingPage}
          ]}
          groupProps = {
            {onRenderHeader: this._onRenderHeader}
          }
          groups={[
            {count: 2, key: 'group1', name: 'group1', isCollapsed: false, startIndex:0},
            {count: 2, key: 'group2', name: 'group2', isCollapsed: false, startIndex:2}
          ]}
        />
        {(this.state.appLinksTrigger == '/locations') && <Redirect push to='/locations' />}
        {(this.state.appLinksTrigger == '/') && <Redirect exact push to='/' />}
        
      </div>
   
    );
  };
}



export const Locations = (props: any) => (
  <div>
    Locations page
    <LinkList />
    <DefaultButton onClick={props.callback} text="Go To Landing Page" styles={getCustomSplitButtonStyles} className="ms-Grid-col ms-u-sm12" />
     {(props.appLinksTrigger == '/') && <Redirect exact push to='/' />}
  </div>
);