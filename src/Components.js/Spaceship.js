import React from 'react';
import { useSelector } from 'react-redux';

const Spaceship = () => {
    const left = useSelector(state => state.moveShip);
    return (
        <div className="ship" id="ship" style={{ left: left, top: 456 }}></div >
    );
};

export default Spaceship;