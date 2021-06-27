const score = (state = 0, action) => {
    switch (action.type) {
        case "ADD_SCORE":
            return state + 1;
        case "RESET_SCORE":
            return state = 0;
        default:
            return state;
    }
}

export default score;