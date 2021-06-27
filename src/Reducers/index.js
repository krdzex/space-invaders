import { combineReducers } from "redux";
import moveShip from "./movingShip";
import moveShipDown from "./movingShipDown";
import enterGame from "./enterGame";
import score from "./hittedAlian";
import lives from "./shipLives";
const allReducers = combineReducers({
    moveShip,
    moveShipDown,
    enterGame,
    score,
    lives
})

export default allReducers;