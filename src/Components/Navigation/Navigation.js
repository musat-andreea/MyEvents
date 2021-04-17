import React from 'react';
import scris from "./LogoScris.png";

const Navigation = ({onRouteChange, isSignedIn}) => {

    if (isSignedIn) {
        return(
            <nav style={{display: 'flex', justifyContent: 'space-between'}}>
                <img alt='logo' src={scris}/>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out
                </p>
            </nav>
        );
    } else {
        return(
            <nav >
                <img style={{display: 'flex', justifyContent: 'flex-start'}} alt='logo' src={scris}/>
<div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p  onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In
                </p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register
                </p>
</div>
            </nav>
        );
    }

}

export default Navigation;