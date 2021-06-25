import React from 'react';
import { useDispatch } from 'react-redux';
import { enter } from '../Actions';
const EnterGame = () => {
    const dispatch = useDispatch()
    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            var div = document.getElementById("enterGameWrapper");
            div.style.visibility = "hidden";
            dispatch(enter())
        }
    }

    return (
        <div className="enterGameWrapper" id="enterGameWrapper" tabIndex="0" onKeyDown={pressEnter}>
        </div >
    );
};

export default EnterGame;