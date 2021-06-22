import { combineReducers } from "redux";
import moveShip from "./movingShip";
import moveShipDown from "./movingShipDown";
const allReducers = combineReducers({
    moveShip,
    moveShipDown
})

export default allReducers;