const moveShip = (state = 0, action) => {
    switch (action.type) {
        case "MOVE_LEFT":
            return state - 5;
        case "MOVE_RIGHT":
            return state + 5;
        default:
            return state;
    }
}

export default moveShip;