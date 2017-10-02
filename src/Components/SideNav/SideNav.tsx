import * as React from 'react';

import {SideNavList} from './SideNavList';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { DefaultButton} from 'office-ui-fabric-react/lib/Button';
//import * as Comps from '../../moduleLoader';

const sideNavMobileIconStyles : IButtonStyles = {
    root: {color: '#f8f8f8', backgroundColor: '#3c3c3c', alignItems: 'flex-start'},
    icon: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    label: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    menuIcon: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    iconHovered: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    iconPressed: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    iconChecked: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    iconDisabled: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    iconExpanded: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    
    rootHovered: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    rootPressed: {color: '#f8f8f8', backgroundColor: '#3c3c3c'},
    rootFocused: {color: '#f8f8f8', backgroundColor: '#3c3c3c'}
    
    
    
};



export class SideNav extends React.Component<any, any> {
  constructor(props:any) {
    super(props);
    this.state = {init:'init'};
    Object.assign(this.state, {showSideMenu:false});
    Object.assign(this.state, {redirectLink : null});
    
    this.onClickShowHideSideMenu = this.onClickShowHideSideMenu.bind(this);
    this.onClickRedirectToLink = this.onClickRedirectToLink.bind(this);
    this.resetRedirectLink = this.resetRedirectLink.bind(this);
    
  }
  
  onClickRedirectToLink(target:any) { this.setState( {redirectLink : target} ); };
  resetRedirectLink () { this.setState( {redirectLink: null})};
  
  componentDidUpdate() {
    this.state.redirectLink !== null && (() =>  this.setState (
          (prevState:any, props:any) => ({ redirectLink : null }) 
        ))();
  }
  
  
  
  onClickShowHideSideMenu() {
    this.setState({showSideMenu: !this.state.showSideMenu});
  }
  
  

  render() {
    // const closeBtn = () => (<i className='ms-Icon ms-Icon--GlobalNavButton ms-font-xl' aria-hidden='true'></i>);
    
        
    // Frame01Switch.state.appLinksTrigger is temporary used instead of history
    // history will be installed and used later, when I study it
    
    const redirectLink = {
      redirectLink: this.state.redirectLink,
      setter: this.onClickRedirectToLink,
      resetter: this.resetRedirectLink
    };
    //const sideNavRedirectLink = this.state.redirectLink;
    //const setRedirectLink = this.onClickRedirectToLink;
    //const redirectLinkResetter = this.resetRedirectLink;
    
    /**
    const goToLandingPage = () => (this.onClickRedirectToLink('/'));
    const LandingPageLinked = () => (<Comps.LandingPage callback={goToLandingPage}  />);
    const goToLocationsPage = () => (this.onClickRedirectToLink('/locations'));
    const LocationsPageLinked = () => (<Comps.Locations callback={goToLocationsPage}  /> );
    const goToRestoRomance = () => (this.onClickRedirectToLink('/locations/RestoRomance'));
    const RestoRomancePageLinked = () => (<Comps.RestoRomance callback={goToRestoRomance}  />);
    const goToTimeWrap = () => (this.onClickRedirectToLink('/locations/TimeWrap'));
    const TimeWrapPageLinked = () => (<Comps.TimeWrap callback={goToTimeWrap}  />);
    const goToHikeAndSmile = () => (this.onClickRedirectToLink('/locations/HikeAndSmile'));
    const HikeAndSmilePageLinked = () => (<Comps.HikeAndSmile callback={goToHikeAndSmile}  />);
    **/ 
    
    return(
      <div className="ms-Grid-col ms-u-sm12 ms-u-md4 ms-u-borderBase">
        <div className="ms-Grid-row">
          
            {
              this.state.showSideMenu &&
              <div className="ms-bgColor-neutralPrimaryAlt ms-fontColor-neutralLighterAlt ms-Grid-col ms-u-sm12 ms-u-hiddenMdUp ms-u-borderBase ">
                <DefaultButton onClick={this.onClickShowHideSideMenu} styles={sideNavMobileIconStyles} >
                    <i className='ms-Icon ms-Icon--Cancel ms-font-xl ' aria-hidden='true'></i>
                </DefaultButton>
              </div>         
            }
           
            { !this.state.showSideMenu &&
              <div className="ms-Grid-col ms-u-sm12 ms-u-hiddenMdUp ms-bgColor-neutralPrimaryAlt ms-fontColor-neutralLighterAlt ms-u-borderBase">
                <DefaultButton onClick={this.onClickShowHideSideMenu}  styles={sideNavMobileIconStyles} >
                  <i className='ms-Icon ms-Icon--GlobalNavButton ms-font-xl' aria-hidden='true'></i>
                </DefaultButton>
              </div>
            }
        
            {
              this.state.showSideMenu && 
              <div className="ms-Grid-col ms-u-sm12 ms-u-hiddenMdUp ms-bgColor-neutralPrimaryAlt">
                 <SideNavList redirectLink={redirectLink} />
              </div>
            }
          
          <div className=" ms-u-hiddenSm ms-Grid-col ms-u-sm12 ms-bgColor-neutralPrimaryAlt">
            <SideNavList redirectLink={redirectLink}  />
          </div>
          
        </div>

      </div>
    );
  };
};