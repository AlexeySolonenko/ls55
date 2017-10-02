import * as React from 'react';
import {Redirect} from 'react-router-dom';
//import { Nav, INavProps } from 'office-ui-fabric-react/lib/Nav';
import { DefaultButton} from 'office-ui-fabric-react/lib/Button';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

import {
  GroupedList,
//  IGroup,
  IGroupDividerProps
} from 'office-ui-fabric-react/lib/components/GroupedList/index';

const sideNavBtnStyles : IButtonStyles = {
    root: {color: '#f8f8f8', backgroundColor: '#3c3c3c', textAlign: 'left'},
    rootHovered: {color: '#f8f8f8', backgroundColor: '#3c3c3c', textAlign: 'left'},
    rootPressed: {color: '#f8f8f8', backgroundColor: '#3c3c3c', textAlign: 'left'},
    rootFocused: {color: '#f8f8f8', backgroundColor: '#3c3c3c', textAlign: 'left'}
    
};

/*
const getCustomSplitButtonStyles : IButtonStyles = {
    root: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    rootHovered: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    rootPressed: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    rootFocused: {color: '#f8f8f8', backgroundColor: '#3c3c3c'} 
};
*/


export class SideNavList extends React.Component<any,any> {
  constructor(props: any){
    super(props);
    
    this.state = {init: 'init'};
    // Object.assign(this.state, {linkToLocationsResetter: false});
    Object.assign(this.state, {appLinksTrigger: null});
    Object.assign(this.state, {mobileBar: false});
    
    this.onClickRedirectToLink = this.onClickRedirectToLink.bind(this);
    this.setLink = this.setLink.bind(this);
  };

  
  // REACT UTILITIES METHODS 
  componentDidUpdate() {
    this.state.appLinksTrigger !== null && (() =>  this.setState (
          (prevState:any, props:any) => (
            { appLinksTrigger : null }
          ) 
        ) 
      )();
    //this.props.redirectLink.resetter();
  }
  
  
  // ROUTER LINK HANDLING METHODS
  setLink(appLink: any) {
    this.props.redirectLink.setter(appLink);
  }
  
  onClickRedirectToLink(target:any) { this.setState( {appLinksTrigger : target} ); };
  
  
  //RENDER CELL
  private _onRenderCell (nestingDepth: number, item: any, itemIndex: number) {
    
    return (
      <div data-selection-index= { itemIndex } >
        {((item.name == 'TimeWrap') || (item.name == 'RestoRomance') || (item.name == 'HikeAndSmile')) ?
          <div>
            <span className="ms-Grid-col ms-u-sm1">&nbsp;</span> 
            <DefaultButton onClick={item.callback} text={item.name} styles={sideNavBtnStyles} className="ms-Grid-col ms-u-sm10" />
          </div>
          :
          <DefaultButton onClick={item.callback} text={item.name} styles={sideNavBtnStyles} className="ms-Grid-col ms-u-sm11" />
        }
      </div>
    );
  }

  //RENDER HEADER
  private _onRenderHeader(props: IGroupDividerProps): JSX.Element {
   
    const toggleCollapse = (): void => {
      props.onToggleCollapse!(props.group!);
    };
    const groupHeaderClick = (): void => {
        props.group!.data.linkCall();
    }
    

    if(props.group!.key == 'group0'){
      return (
        <DefaultButton onClick={groupHeaderClick} text="Landing Page" styles={sideNavBtnStyles} className="ms-Grid-col ms-u-sm12" />
      );
    };
    
   
    if(props.group!.key == 'group1') {
      return (
        <div>
          {props.group!.isCollapsed ? 
            <div>
              <DefaultButton onClick={groupHeaderClick} text="Locations" styles={sideNavBtnStyles} className="ms-Grid-col ms-u-sm6" />
              <DefaultButton onClick={toggleCollapse}  styles={sideNavBtnStyles} className="ms-Grid-col ms-u-sm4" >
                <i onClick={toggleCollapse} className='ms-Icon ms-Icon--ChevronUp ms-font-m' aria-hidden='true'></i>
              </DefaultButton>
            </div>
          :
            <div>
              <DefaultButton onClick={groupHeaderClick} text="Locations" styles={sideNavBtnStyles} className="ms-Grid-col ms-u-sm6" />
              <DefaultButton onClick={toggleCollapse}  styles={sideNavBtnStyles} className="ms-Grid-col ms-u-sm4" >
                <i onClick={toggleCollapse} className='ms-Icon ms-Icon--ChevronDown ms-font-m' aria-hidden='true'></i>
              </DefaultButton>
            </div>
          }
        </div>
          
      );
    };
    return (
      <div></div>
    );
  }
  
  
  // RENDER
  public render() {
   
    const goToLandingPage = () => (this.setLink('/'));
    const goToLocationsPage = () => (this.setLink('/locations'));
    const goToRestoRomance = () => (this.setLink('/locations/RestoRomance'));
    const goToTimeWrap = () => (this.setLink('/locations/TimeWrap'));
    const goToHikeAndSmile = () => (this.setLink('/locations/HikeAndSmile'));
    
    const redirectLink = this.props.redirectLink.redirectLink;

    
    return(
      <div className="ms-Grid-row">

        
        
        <GroupedList 
          ref='groupedList'
          onRenderCell = {this._onRenderCell}
          items = {[
            {name:'LandingPage', callback: goToLandingPage},
            {name: 'Locations', callback: goToLocationsPage },
            {name:'RestoRomance', callback: goToRestoRomance, nestingDepth:1},
            {name: 'TimeWrap', callback: goToTimeWrap, nestingDepth:1},
            {name: 'HikeAndSmile', callback: goToHikeAndSmile, nestingDepth:1}
          ]}
          groupProps = { 
            {onRenderHeader: this._onRenderHeader, headerProps : {onGroupHeaderClick: goToTimeWrap}, showEmptyGroups: true}
          }
          className="ms-Grid-col ms-u-ms12"  
          groups={[
            {count: 0, key: 'group0', name: 'group0', isCollapsed: false, startIndex:0, data:{linkCall:goToLandingPage} },
            {count: 3, key: 'group1', name: 'group1', isCollapsed: false, startIndex:2, data:{linkCall:goToLocationsPage} },
            
          ]}
          
        />
        
        {(redirectLink == '/locations') && <Redirect exact push to='/locations' />}
        {(redirectLink == '/') && <Redirect exact push to='/' />}
        {(redirectLink == '/locations/RestoRomance') && <Redirect push to='/locations/RestoRomance' />}
        {(redirectLink == '/locations/TimeWrap') && <Redirect push to='/locations/TimeWrap' />}
        {(redirectLink == '/locations/HikeAndSmile') && <Redirect push to='/locations/HikeAndSmile' />} 
      </div>
   
    );
  };
}
