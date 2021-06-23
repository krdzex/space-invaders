const hitted = (state = false, action) => {
    switch (action.type) {
        case "HIT":
            return !state;
        case "NOT_HIT":
            return state = false;
        default:
            return state;
    }
}

export default hitted;