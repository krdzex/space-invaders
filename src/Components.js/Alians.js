import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveDown, moveUp } from '../Actions';

var speed2 = 20;
const Alians = () => {
    const dispatch = useDispatch();
    const alians = Array(55).fill(null)
    const left = useSelector(state => state.moveShipDown);

    const speed = () => (speed2 -= 1);
    const movingAlians = () => {
        const alians = document.getElementsByClassName("alian");
        const ship = document.getElementById("ship").getBoundingClientRect();

        if (((parseInt(alians[alians.length - 1].style.top)) + 160) < ship.y) {
            if (left === false) {
                for (let i = 0; i < alians.length; i++) {
                    alians[i].style.left = (parseInt(alians[i].style.left) + 2) + "px";

                    if (parseInt(alians[alians.length - 1].style.left) === 300) {
                        for (let i = 0; i < alians.length; i++) {
                            alians[i].style.top = (parseInt(alians[i].style.top) + 20) + "px";
                        }
                        dispatch(moveDown())
                        clearInterval(moving)
                    }
                }
            } else if (left === true) {
                for (let i = 0; i < alians.length; i++) {

                    alians[i].style.left = (parseInt(alians[i].style.left) - 2) + "px";

                    if (parseInt(alians[alians.length - 1].style.left) === -20) {
                        for (let i = 0; i < alians.length; i++) {
                            alians[i].style.top = (parseInt(alians[i].style.top) + 20) + "px";
                        }

                        dispatch(moveUp())
                        return clearInterval(moving)
                    }
                }
            }
        } else {
            clearInterval(moving)
        }
    }
    var moving = setInterval(movingAlians, speed());
    return (
        <div className="alians">
            {alians.map((alian, id) => {
                return <div className="alian" style={{ left: "0px", top: "20px" }} id="alian" key={id}></div>
            })}
        </div>
    );
};

export default Alians;