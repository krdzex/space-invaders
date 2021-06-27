const lives = (state = 3, action) => {
    switch (action.type) {
        case "DIED":
            return state - 1;
        case "RESET_LIVES":
            return state = 3;
        default:
            return state;
    }
}

export default lives;