import React from 'react';
import { useSelector } from 'react-redux';
import tank from "../photos/Tenk2.PNG"

const Spaceship = () => {
    const left = useSelector(state => state.moveShip);
    return (
        <img src={tank} alt="tank" className="ship" id="ship" style={{ left: left, top: 60 }}></img >
    );
};

export default Spaceship;