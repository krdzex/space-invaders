import React from 'react';
import Spaceship from './Spaceship';
import { useDispatch } from 'react-redux';
import { addScore, cantEnter, died, moveLeft, moveRight, resetLives } from '../Actions/index';
import Alians from './Alians';
import Info from './Info';


const Game = () => {
    //autoFocus je funkcija koja ce uzeti da fokusira div appWrapper on load tako da ne moramo da kliknemo na div da bi nam radio onKeyDown
    const autoFocus = () => {
        document.getElementById('appWrapper').focus();
    }

    //If u want alians to make bullets faster, lower variable enemyBulletSpee
    let enemyBulletSpeed = 3000;
    const dispatch = useDispatch();
    let stopShooting = 3;
    let shooting;
    let movingEnemyBullet;
    /*This function is about moving ship and firing bullet
    If e.key is equal to ArrowRight(=>) and if ship.right is less then app.x(where our app start) + app.width ( width of our app div) + 
     300(Because our alians move 300px right we need to add 300).
    If that is correct we dispatch moveRight and that will add ship.style.left 15px
    Samo logic for left moving left but now we need to see if ship.left is greater then app.x
    Because alians cant pass app.x there is no need to move alian more on left
    And last if we press space bar we chack if there is no bullets on board and if that is correct we make bullet and after that we set interval where we call function shoot
     */
    const moveShip = (e) => {
        let ship = document.getElementById("ship").getBoundingClientRect();
        let app = document.getElementById("App").getBoundingClientRect();
        if (e.key === "ArrowRight" && ship.right < (app.x + app.width + 300)) {
            dispatch(moveRight());
        } else if (e.key === "ArrowLeft" && ship.left > app.x) {
            dispatch(moveLeft());
        }

        if (e.key === ' ') {
            let bullet = document.getElementById("bullet");
            if (bullet === null) {
                makeBullet();
                shooting = setInterval(shoot, 1);
            }
        }
    }

    /*Function shoot  
    First we need to get array of alians and position of our bullet
    After that we chack if bullet position y is greater than 0 (because our bullet will show up on middle of screen where our ship is
    If bullet go up,our bullet.y will become smaller until it comes to 0 and then we will remove div bullet)
    then we need to lower out bullet.top because that will move our bullet up and we move it up 8 px.
    Then after that we loop through array because we need to see if our bullet hitted some alian.
    for that we need position of every alian.
    then we use classic algorith for 2d collision to chack if our bullet hitted alian
    adding alian.x + 25(25 is width of alian)
    adding bulletPosition.x + 5(5 is width of bullet)
    adding alian.y + 20(20 is height of alian)
    adding bulletPosition.y + 20(20 is height of bullet)
    if all that that is true we need to make hitted alian hidden
    we could remove hitted alian with remove but that would ruin our construction of alians because all alians right from him will move left and it would looks like our last alian got hitted
    And after that we addScore plus 1
    */
    const shoot = () => {
        let alians = document.getElementsByClassName("alian");
        let bullet = document.getElementById("bullet");
        let bulletPosition = bullet.getBoundingClientRect();
        if (bulletPosition.y > 0) {
            bullet.style.top = (parseInt(bullet.style.top) - 8) + "px";
            for (let i = 0; i < alians.length; i++) {
                let alian = alians[i].getBoundingClientRect();
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
    /* function makeBullet in this function we make our bullet div. We need positions of ship
    we add position relative so we can move bullet
    style left need to be ship.x(where ship begins) and plus 18(to center on middle of ship)
    */
    const makeBullet = () => {
        let ship = document.getElementById("ship").getBoundingClientRect();
        let div = document.createElement('div');
        div.style.position = "relative";
        div.style.left = (ship.x + 18) + "px";
        div.style.top = (0) + "px";
        div.className = "bullet";
        div.id = "bullet"
        document.getElementById("appWrapper").appendChild(div)
    }

    /* In random alian function we need to get random alian to fire bullet
    first i made array where i go through loop of all alins and see if they are visible
    if they are visible i add them into array. If i didnt do it like this when we kill alian he could still shoot bullet on ship and that wouldnt make sense.
    After that i need to find random number in that array
    and lastly we return randomVisible alian
    part where our array is empty means that all alians are killed and there is no visible alians in game
    That means we need to set our alians to be visible and return them on original position
    */
    const randomAlian = () => {
        let visibleAliansArray = [];
        let alians = document.getElementsByClassName("alian");
        for (let i = 0; i < alians.length; i++) {
            let alian = alians[i].style.visibility;
            if (alian !== "hidden") {
                visibleAliansArray.push(i);
            }
        }

        let randomAlianNumber = Math.floor(Math.random() * (visibleAliansArray.length - 1 + 1)) + 0;

        if (visibleAliansArray.length === 0) {
            for (let i = 0; i < alians.length; i++) {
                let alian = alians[i];
                alian.style.visibility = "visible";
                alian.style.top = "20px"
                alian.style.left = "0px"
            }
            enemyBulletSpeed = 2000;
        }
        return visibleAliansArray[randomAlianNumber];
    }


    /*MakeAlian bullet function
    After we have our random alian we need to make bullet on that position
    after that we need position of our randomAlian
    then we create bullet and give him styles
    position relative so he can move down
    left is equel for x of random alian and we add 10 to center it on middle
    Because our bullet would appear under our ship
    So we need to take alian.y - ship.y coz we difference between 2 of them
    and we add 40 on that(20 is ship height, 20 is random alian height and) and bullet will apear right under our random alian
    */
    const makeAlianBullet = () => {
        let alians = document.getElementsByClassName("alian");
        if (alians.length > 0 && randomAlian() !== undefined) {
            let alian = alians[randomAlian()].getBoundingClientRect();
            let ship = document.getElementById("ship").getBoundingClientRect();

            let diff = alian.y - ship.y;
            let div = document.createElement('div');
            div.style.position = "relative";
            div.style.left = (alian.x + 10) + "px";
            div.style.top = (diff + 40) + "px";
            div.className = "enemyBullet";
            div.id = "enemyBullet"
            document.getElementById("appWrapper").appendChild(div)
        }
        /*Now after we made bullet we need to move it down
        we are using setInterval to do moving
        we are using getElementsByClassName to get array of bullets
        In that case if we have 2 bullets in game both of them will move and not just one
        We loop through bullets and get position of one bullet
        we see if y of bullet less then ship.y because it is higher then ship and we need bullet to go down
        if that is true we lower bullet with style.top 2 px
        then we want to chack did enemyBullet hit our ship
        we do same algorith like last time and if that is true we 
        we take our bullet lives.Even though i have state for lives i cant use it here because if i use useSelector that will rerender our Game component and it will mess our intervals
        So i made let stopShooting and they represent lives
        So when our algorith is true we take 1 loves
        and if our lives are 0 we need to clear all intervals that are going on
        And to change component on EnterGame because game is over and you need to start over
        Of course if our bullet go past ship,bullet y will be greater then ship.y and we then need to remove enemyBullet
        */
        movingEnemyBullet = setInterval(() => {
            let enemyBullets = document.getElementsByClassName("enemyBullet");
            let ship = document.getElementById("ship");
            for (let i = 0; i < enemyBullets.length; i++) {
                let enemyBullet = enemyBullets[i];
                let enemyBulletPositions = enemyBullets[i].getBoundingClientRect();
                if (enemyBulletPositions.y < ship.y) {
                    enemyBullet.style.top = (parseInt(enemyBullet.style.top) + 2) + "px";
                    if (enemyBulletPositions.x < ship.x + 40 && enemyBulletPositions.x + 5 > ship.x
                        && enemyBulletPositions.y < ship.y + 20 && enemyBulletPositions.y + 20 > ship.y) {
                        clearInterval(movingEnemyBullet)
                        dispatch(died());
                        enemyBullet.remove();
                        stopShooting -= 1;
                        if (stopShooting === 0) {
                            for (let i = 0; i < 9999; i++) {
                                window.clearInterval(i);
                            }
                            dispatch(cantEnter())
                            dispatch(resetLives())
                        }
                    }
                } else {

                    enemyBullet.remove();
                    window.clearInterval(movingEnemyBullet)
                }
            }



        }, 1);
    }
    /* Because i need to change timing of firing i made setTimeouts to do like but now i can change speed
    This will basicly make loop that will call repeatEnemyBullet and make bullets just with incrementing speed of making bullets 
    */
    const repeatEnemyBullet = () => {
        if (enemyBulletSpeed > 1000) {
            enemyBulletSpeed -= 100
        } else if (enemyBulletSpeed >= 500 && enemyBulletSpeed <= 1000) {
            enemyBulletSpeed -= 50
        } else {
            enemyBulletSpeed -= 2
        }
        makeAlianBullet()
        setTimeout(repeatEnemyBullet, enemyBulletSpeed);
    }

    setTimeout(
        repeatEnemyBullet
        , enemyBulletSpeed);

    return (
        <div className="appWrapper" id="appWrapper" tabIndex="0" onLoad={autoFocus} onKeyDown={moveShip}>
            <div className="App" id="App" >
                <Alians />
            </div>
            <Spaceship />
            <Info />
        </div >);
};

export default Game;