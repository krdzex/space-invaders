const enterGame = (state = true, action) => {
    switch (action.type) {
        case "ENTER":
            return !state;
        case "NOT_ENTER":
            return state = false;
        default:
            return state;
    }
}

export default enterGame;