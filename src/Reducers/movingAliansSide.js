const moveAliansSide = (state = false, action) => {
    switch (action.type) {
        case "MOVE_LEFT_ALIANS":
            return !state;
        case "MOVE_RIGHT_ALIANS":
            return state = false;
        default:
            return state;
    }
}

export default moveAliansSide;