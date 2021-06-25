import './App.css';
import Spaceship from './Components.js/Spaceship';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enter, moveLeft, moveRight } from './Actions';
import Alians from './Components.js/Alians';
import EnterGame from './Components.js/EnterGame';


const App = () => {

  const dispatch = useDispatch();
  var result = 0;
  var shooting;
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
        shooting = setInterval(shoot, 1);
      }
    }

  }


  const shoot = () => {
    var alians = document.getElementsByClassName("alian");
    var bullet = document.getElementById("bullet");
    var bulletPosition = document.getElementById("bullet").getBoundingClientRect();
    if (document.getElementById("bullet").getBoundingClientRect() !== null) {
      if (bulletPosition.y > 0) {
        bullet.style.top = (parseInt(bullet.style.top) - 8) + "px";
        for (var i = 0; i < alians.length; i++) {
          var alian = alians[i].getBoundingClientRect();
          if (bulletPosition.x < alian.x + 25 && bulletPosition.x + 5 > alian.x
            && bulletPosition.y < alian.y + 20 && bulletPosition.y + 20 > alian.y && alians[i].style.visibility !== "hidden") {
            alians[i].style.visibility = "hidden"
            bullet.remove();
            result += 1;
            countResult();
            clearInterval(shooting)
          }
        }
      } else {
        clearInterval(shooting);
        bullet.remove();
      }
    }
  }
  const countResult = () => {
    var divResult = document.getElementById("result");
    divResult.innerText = result;
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
  return (
    <div className="appWrapper" id="appWrapper" tabIndex="0" onKeyDown={moveShip}>
      <EnterGame />
      <div className="App" id="App" >
        <Alians />

      </div>
      <Spaceship />

      <div style={{ color: "white" }}>Score:
        <div className="result" id="result" style={{ color: 'white' }}>0</div>
      </div>
    </div >);
}

export default App;
