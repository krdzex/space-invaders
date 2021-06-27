import React from 'react';
import { useDispatch } from 'react-redux';
import { enter, moveUp, resetScore } from '../Actions';
const EnterGame = () => {
    const dispatch = useDispatch()
    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            var div = document.getElementById("enterGameWrapper");
            div.style.visibility = "hidden";
            dispatch(enter())
            dispatch(moveUp())
            dispatch(resetScore())
        }
    }



    return (
        <div className="enterGameWrapper" id="enterGameWrapper" tabIndex="0" onKeyDown={pressEnter}>
            <div className="enterGameText">
                <h1>Space Invaders</h1>
                <h1>Press enter to play!</h1>
            </div>
        </div >
    );
};

export default EnterGame;