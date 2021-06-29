import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { enter, moveRightAlians, resetScore } from '../Actions';
const EnterGame = () => {
    const dispatch = useDispatch()

    //If we press enter we dispatch enter state to false,reset state score and we want our alianse to go right when they init so we use moveRightAlians
    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            dispatch(enter())
            dispatch(moveRightAlians())
            dispatch(resetScore())
        }
    }
    //Everytime EnterGame render we put focus on our div so we dont need to click on div and then to do onKeyDown
    useEffect(() => {
        document.getElementById('enterGameWrapper').focus();
    })

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