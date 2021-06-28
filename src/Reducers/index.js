import { combineReducers } from "redux";
import moveShip from "./movingShip";
import moveShipSide from "./movingShipSide";
import enterGame from "./enterGame";
import score from "./hittedAlian";
import lives from "./shipLives";

const allReducers = combineReducers({
    moveShip,
    moveShipSide,
    enterGame,
    score,
    lives,

})

export default allReducers;