import React from 'react';
import 'tachyons';
import Tilt from 'react-tilt'
import './Logo.css';
import face from './face-scan.png';
 

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner"><img style={{padding: 3, width: 195, height: 195}} src={face} alt='Logo'></img> </div>
            </Tilt>
        </div>
    );
}

export default Logo;