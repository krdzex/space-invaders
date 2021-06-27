import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cantEnter, moveDown, moveUp, resetLives } from '../Actions';
import alian1 from "../photos/alian1.png"
import alian2 from "../photos/alian2.png"
import alian3 from "../photos/alian3.png"
import alian4 from "../photos/alian4.png"
import alian5 from "../photos/alian5.png"

var speed2 = 20;
const Alians = () => {
    var gameOver = false;
    const dispatch = useDispatch();
    const alians = Array(55).fill(null)
    const left = useSelector(state => state.moveShipDown);
    const speed = () => (speed2 -= 0.5);
    var moving;
    const movingAlians = () => {
        const alians = document.getElementsByClassName("alian");
        //const ship = document.getElementById("ship").getBoundingClientRect();
        for (let i = 0; i < alians.length; i++) {
            const alian = alians[i].getBoundingClientRect();
            if ((alian.y + 60) > 560 && alians[i].style.visibility !== "hidden") {

                for (let i = 0; i < 999; i++) {
                    window.clearInterval(i);
                }

                gameOver = true;
                speed2 = 20;
                dispatch(cantEnter())
                dispatch(resetLives())
                clearInterval(moving)
            }
        }
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
    }
    if (gameOver === false) {
        moving = setInterval(movingAlians, speed());
    }
    return (
        <div className="alians">
            {alians.map((alian, id) => {
                if (id >= 0 && id < 11) {
                    return <img src={alian1} alt="Alian" className="alian" style={{ left: "0px", top: "20px" }} id="alian" key={id}></img>
                }
                else if (id >= 11 && id < 22) {
                    return <img src={alian2} alt="Alian" className="alian" style={{ left: "0px", top: "20px" }} id="alian" key={id}></img>
                }
                else if (id >= 22 && id < 33) {
                    return <img src={alian3} alt="Alian" className="alian" style={{ left: "0px", top: "20px" }} id="alian" key={id}></img>
                }
                else if (id >= 33 && id < 44) {
                    return <img src={alian4} alt="Alian" className="alian" style={{ left: "0px", top: "20px" }} id="alian" key={id}></img>
                }
                return <img src={alian5} alt="Alian" className="alian" style={{ left: "0px", top: "20px" }} id="alian" key={id}></img>
            })}
        </div>
    );
};

export default Alians;