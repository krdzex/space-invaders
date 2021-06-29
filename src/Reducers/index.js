import { combineReducers } from "redux";
import moveShip from "./movingShip";
import moveAliansSide from "./movingAliansSide";
import enterGame from "./enterGame";
import score from "./hittedAlian";
import lives from "./shipLives";

const allReducers = combineReducers({
    moveShip,
    moveAliansSide,
    enterGame,
    score,
    lives

})

export default allReducers;