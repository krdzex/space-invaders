import React from 'react';
import { useSelector } from 'react-redux';

import tank from "../photos/Tenk2.PNG"


const Info = () => {
    const score = useSelector(state => state.score);
    const lives = useSelector(state => state.lives);

    return (
        <div className="infoWrapper" >
            <p style={{ float: 'left' }}>Score is: {score}</p>
            <p style={{ float: 'right' }}>Lives: {lives}x <img src={tank} alt="lives" /></p>
            <div style={{ color: "green", fontStyle: "italic" }}>
                <p>Move with arrow keys,fire with the space bar</p>
            </div>
        </div >
    );
};

export default Info;