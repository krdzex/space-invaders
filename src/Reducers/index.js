import { combineReducers } from "redux";
import moveShip from "./movingShip";
import moveShipDown from "./movingShipDown";
import enterGame from "./enterGame";
const allReducers = combineReducers({
    moveShip,
    moveShipDown,
    enterGame
})

export default allReducers;