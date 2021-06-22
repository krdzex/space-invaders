import './App.css';
import Spaceship from './Components.js/Spaceship';
import React from 'react';
import { useDispatch } from 'react-redux';
import { moveLeft, moveRight } from './Actions';
import Alians from './Components.js/Alians';
const App = () => {

  const dispatch = useDispatch();
  const moveShip = (e) => {
    var ship = document.getElementById("ship").getBoundingClientRect();
    var bodyRect = document.getElementById("App").getBoundingClientRect();
    var offset = bodyRect.right - ship.right;
    if (e.key === "ArrowRight" && offset >= 5) {
      dispatch(moveRight());
    } else if (e.key === "ArrowLeft" && offset <= 455) {
      dispatch(moveLeft());
    }

    if (e.key === ' ') {
      makeBullet();
      let dodji = setInterval(() => {
        var alians = document.getElementsByClassName("alian");
        var bullet1 = document.getElementById("bullet");
        var bullet = document.getElementById("bullet").getBoundingClientRect();
        var bodyRect = document.getElementById("App").getBoundingClientRect();
        if (document.getElementById("bullet").getBoundingClientRect() !== null) {
          if (bodyRect.y < bullet.y) {
            bullet1.style.top = (parseInt(bullet1.style.top) - 1) + "px";
            for (var i = 0; i < alians.length; i++) {
              var alian = alians[i].getBoundingClientRect();
              if (alian.y === bullet.y) {
                console.log("A")
              }
              if (alians.x === bullet.x) {
                console.log("B")
              }
            }
          } else {
            clearInterval(dodji);
            bullet1.remove();
          }
        }

      }, 1);
    }
  }
  const makeBullet = () => {
    var bullet = document.getElementById("bullet");
    if (bullet === null) {
      var ship = document.getElementById("ship").getBoundingClientRect();
      const div = document.createElement('div');

      div.style.position = "relative";
      div.style.left = (ship.x - 2) + "px";
      div.style.top = (ship.y - 60) + "px";
      div.className = "bullet";
      div.id = "bullet"
      document.getElementById("App").appendChild(div)
    }

  }
  return (
    <div className="App" id="App" tabIndex="0" onKeyDown={moveShip}>
      <Alians />
      < Spaceship />
    </div >
  );
}

export default App;
