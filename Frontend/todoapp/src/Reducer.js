const initialState = localStorage.token ? true : false;;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN': {
            state = true;
            return state;
        }
        case 'LOGOUT': {
            state = false;
            return state;
        }
    }
}

export { initialState };
export default reducer;