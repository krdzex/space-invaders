import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveDown, moveUp } from '../Actions';

const Alians = () => {
    const dispatch = useDispatch();
    const alians = Array(5).fill(null)
    const left = useSelector(state => state.moveShipDown);
    var moving = setInterval(() => {
        const alians = document.getElementsByClassName("alian");
        const ship = document.getElementById("ship").getBoundingClientRect();
        if ((parseInt(alians[0].style.top)) < ship.top) {
            if (left === false) {
                for (let i = 0; i < alians.length; i++) {
                    alians[i].style.left = (parseInt(alians[i].style.left) + 1) + "px";
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
                    alians[i].style.left = (parseInt(alians[i].style.left) - 1) + "px";

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

    }, 2);
    return (
        <div className="alians">
            {alians.map((alian, id) => {
                return <div className="alian" style={{ left: "0px", top: "20px" }} id="alian" key={id}></div>
            })}
        </div>
    );
};

export default Alians;