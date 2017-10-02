import * as React from 'react';
import { Image, IImageProps, ImageFit } from 'office-ui-fabric-react/lib/Image';

export class Header extends React.Component <any, any> {
  
  
  public render() {
    let imgSrc = require('./mt.png');
    let imageProps: IImageProps ={
      src:imgSrc,
      imageFit: ImageFit.contain,
      height:70
    };
    
    return (
      <div className="ms-Grid-row">
        <div className="ms-Grid-col ms-u-sm12">
          <Image {...imageProps as any} alt='ad' /> 
          
          <Image src='350x150.png' alt='asdf'/> 
          Page Header 2
          
        </div>
        
        
      </div>
    );
  }
};