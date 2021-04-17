import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import calendar from './calendar.gif';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner PA3"> <img style={{paddingBottom: '10px'}}  alt='logo' src={calendar} /> </div>
            </Tilt>
        </div>
    );
}

export default Logo;