const shooting = (state = false, action) => {
    switch (action.type) {
        case "CAN_SHOOT":
            return !state;
        case "CANT_SHOOT":
            return state = true;
        default:
            return state;
    }
}

export default shooting;