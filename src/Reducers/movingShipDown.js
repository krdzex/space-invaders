const moveShipDown = (state = false, action) => {
    switch (action.type) {
        case "MOVE_DOWN":
            return !state;
        case "MOVE_UP":
            return state = false;
        default:
            return state;
    }
}

export default moveShipDown;