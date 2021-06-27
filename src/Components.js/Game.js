import React from 'react';
import Spaceship from './Spaceship';
import { useDispatch } from 'react-redux';
import { addScore, cantEnter, died, moveLeft, moveRight, resetLives } from '../Actions/index';
import Alians from './Alians';
import Info from './Info';


const Game = () => {
    var enemyBulletSpeed = 2000;
    const dispatch = useDispatch();
    var stopShooting = 3;
    var shooting;
    var movingEnemyBullet;
    const moveShip = (e) => {
        var ship = document.getElementById("ship").getBoundingClientRect();
        var app = document.getElementById("App").getBoundingClientRect();
        if (e.key === "ArrowRight" && ship.right < (app.x + app.width + 300)) {
            dispatch(moveRight());
        } else if (e.key === "ArrowLeft" && ship.left > app.x) {
            dispatch(moveLeft());
        }

        if (e.key === ' ') {
            var bullet = document.getElementById("bullet");
            if (bullet === null) {
                makeBullet();
                //makeAlianBullet();
                shooting = setInterval(shoot, 1);
            }
        }
    }


    const shoot = () => {
        var alians = document.getElementsByClassName("alian");
        var bullet = document.getElementById("bullet");
        var bulletPosition = bullet.getBoundingClientRect();
        if (document.getElementById("bullet").getBoundingClientRect() !== null) {
            if (bulletPosition.y > 0) {
                bullet.style.top = (parseInt(bullet.style.top) - 8) + "px";
                for (var i = 0; i < alians.length; i++) {
                    var alian = alians[i].getBoundingClientRect();
                    if (bulletPosition.x < alian.x + 25 && bulletPosition.x + 5 > alian.x
                        && bulletPosition.y < alian.y + 20 && bulletPosition.y + 20 > alian.y && alians[i].style.visibility !== "hidden") {
                        alians[i].style.visibility = "hidden"
                        bullet.remove();
                        dispatch(addScore())
                        clearInterval(shooting)
                    }
                }
            } else {
                clearInterval(shooting);
                bullet.remove();
            }
        }
    }

    const makeBullet = () => {
        var bullet = document.getElementById("bullet");
        if (bullet === null) {
            var ship = document.getElementById("ship").getBoundingClientRect();
            var div = document.createElement('div');
            div.style.position = "relative";
            div.style.left = (ship.x + 18) + "px";
            div.style.top = (-20) + "px";
            div.className = "bullet";
            div.id = "bullet"
            document.getElementById("appWrapper").appendChild(div)
        }
    }

    const randomAlian2 = () => {
        var niz = [];
        var alians = document.getElementsByClassName("alian");
        for (let i = 0; i < alians.length; i++) {
            var alian = alians[i].style.visibility;
            if (alian !== "hidden") {
                niz.push(i);
            }
        }
        var randomAlian = Math.floor(Math.random() * (niz.length - 1 + 1)) + 0;
        return niz[randomAlian];
    }


    const makeAlianBullet = () => {
        var alians = document.getElementsByClassName("alian");
        if (alians.length > 0) {
            var alian = alians[randomAlian2()].getBoundingClientRect();
            var ship = document.getElementById("ship").getBoundingClientRect();
            var diff = alian.y - ship.y;
            var div = document.createElement('div');
            div.style.position = "relative";
            div.style.left = (alian.x + 10) + "px";
            div.style.top = (diff + 60) + "px";
            div.className = "enemyBullet";
            div.id = "enemyBullet"
            document.getElementById("appWrapper").appendChild(div)
            randomAlian2();
        }
        movingEnemyBullet = setInterval(() => {
            if (stopShooting !== 0) {
                var enemyBullets = document.getElementsByClassName("enemyBullet");
                var ship = document.getElementById("ship");
                for (var i = 0; i < enemyBullets.length; i++) {
                    var enemyBullet = enemyBullets[i];
                    var enemyBulletPositions = enemyBullets[i].getBoundingClientRect();
                    if (enemyBulletPositions.y < ship.y) {
                        enemyBullet.style.top = (parseInt(enemyBullet.style.top) + 2) + "px";
                        if (enemyBulletPositions.x < ship.x + 40 && enemyBulletPositions.x + 5 > ship.x
                            && enemyBulletPositions.y < ship.y + 20 && enemyBulletPositions.y + 20 > ship.y) {
                            clearInterval(movingEnemyBullet)
                            dispatch(died());
                            enemyBullet.remove();
                            stopShooting -= 1;
                            if (stopShooting === 0) {
                                for (let i = 0; i < 999; i++) {
                                    window.clearInterval(i);
                                }
                                // clearInterval(random)
                                dispatch(cantEnter())
                                dispatch(resetLives())
                                stopShooting = 3;
                            }
                        }
                    } else {

                        enemyBullet.remove();
                        clearInterval(movingEnemyBullet)
                    }
                }
            }


        }, 1);
    }
    const uradi = () => {
        if (enemyBulletSpeed > 1000) {
            enemyBulletSpeed -= 100
        } else if (enemyBulletSpeed >= 500 && enemyBulletSpeed <= 1000) {
            enemyBulletSpeed -= 50
        } else {
            enemyBulletSpeed -= 2
        }
        console.log(enemyBulletSpeed)
        makeAlianBullet()
        setTimeout(uradi, enemyBulletSpeed);
    }

    setTimeout(
        uradi
        , enemyBulletSpeed);
    /* setTimeout(function callback() {
         console.log("A")
         // do something
         setTimeout(callback, rate + 10000);
     });*/

    /*var random = setInterval(
        makeAlianBullet
        , alianBulletSpeed());*/
    return (
        <div className="appWrapper" id="appWrapper" tabIndex="0" onKeyDown={moveShip}>
            <div className="App" id="App" >
                <Alians />
            </div>
            <Spaceship />
            <Info />
        </div >);
};

export default Game;