const moveShip = (state = 380, action) => {
    switch (action.type) {
        case "MOVE_LEFT":
            return state - 15;
        case "MOVE_RIGHT":
            return state + 15;
        default:
            return state;
    }
}

export default moveShip;