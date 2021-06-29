import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cantEnter, moveLeftAlians, moveRightAlians, resetLives } from '../Actions';
import alian1 from "../photos/alian1.png"
import alian2 from "../photos/alian2.png"
import alian3 from "../photos/alian3.png"
import alian4 from "../photos/alian4.png"
import alian5 from "../photos/alian5.png"

let speed2 = 30;
const Alians = () => {
    /*I used use effect because i want everytime my componets go from EnterGame to Game to have speed2 = 20
    For example if i didnt do this first run would be with normal speed but if player die in middle of game our speed2 would be 15
    So when we enter game again our speed2 would start from 15 and so on, so we want to prevent that.Because this Component render every time our alians hit right edge and left edge
    we cant initialise speed2 inside component because of every render it would change speed on 20 and our alians wouldn go faster 
    */
    useEffect(() => {
        speed2 = 30;
    }, [])

    // Almost same logic like useEffect but now we need to return speed2 on 20 when our array is empty and our ship destroyed every alian
    const resetSpeed = () => {
        let visibleAliansArray = [];
        let alians = document.getElementsByClassName("alian");
        for (let i = 0; i < alians.length; i++) {
            let alian = alians[i].style.visibility;
            if (alian !== "hidden") {
                visibleAliansArray.push(i);
            }
        }
        if (visibleAliansArray.length === 0) {
            speed2 = 30;
        }
    }

    const dispatch = useDispatch();
    const alians = Array(55).fill(null)
    const left = useSelector(state => state.moveAliansSide);
    const speed = () => (speed2 -= 0.5);
    let moving;
    /* Moving alians
    firstly i chack if my alian is in samo line as my ship and if that alian is not hidden that means our ship will die for sure because alians will run over ship
    If that happens i need to change restart game
    this 500 is width of our App div where our alians move
    if that is not true we have const left
    That is state that will change when our alians hit right or left edge
    So on first try we see if our left is false that means alians need to go right
    then i take all alians and move their left by 2 px
    if style from alian === 300 that means our alians got to right edge we take all alians and drop them down 20px
    then we dispatch moveLeftAlians to change our left state and clear interval
    Then our component will render and on our next try our left will be true so alians will go left
    and we use same logic like going for right and going down
    */
    const movingAlians = () => {
        const alians = document.getElementsByClassName("alian");
        for (let i = 0; i < alians.length; i++) {
            const alian = alians[i].getBoundingClientRect();
            if ((alian.y) > 500 && alians[i].style.visibility !== "hidden") {

                for (let i = 0; i < 999; i++) {
                    window.clearInterval(i);
                }
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
                    dispatch(moveLeftAlians())
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

                    dispatch(moveRightAlians())
                    clearInterval(moving)
                }
            }
        }
        resetSpeed();
    }
    /* This is where we set our interval and we call function speed that will lower our speed2 on every render that means when our alians hit right or left edge it will go little bit faster
    if u want to test batter u can remove speed and put ur value like 3000 and that would move alians every 3 sacond
    */
    moving = setInterval(movingAlians, speed());

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