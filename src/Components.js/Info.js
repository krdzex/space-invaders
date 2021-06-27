import React from 'react';
import { useSelector } from 'react-redux';
import { moveUp } from '../Actions';
import tank from "../photos/Tenk2.PNG"
import { useDispatch } from 'react-redux';

const Info = () => {
    const dispatch = useDispatch();
    const score = useSelector(state => state.score);
    const lives = useSelector(state => state.lives);
    /*if (score === 55) {
        var alians = document.getElementsByClassName("alian");
        for (let i = 0; i < alians.length; i++) {
            var alian = alians[i];
            alian.style.visibility = "visible";
            alian.style.top = "20px"
            alian.style.left = "0px"
        }
        dispatch(moveUp())
    }*/
    return (
        <div className="infoWrapper" >
            <p style={{ float: 'left' }}>Score is: {score}</p>
            <p style={{ float: 'right' }}>Lives: {lives}x <img src={tank} alt="lives" /></p>
        </div >
    );
};

export default Info;