import * as actionTypes from '../actions/actionTypes'

const initialState = {
    islogin: true,
    input: "index index"
}

const reducer = (state = initialState, action) => {


    if(action.type === actionTypes.TEST){

        //console.log(state.input);
        return {
            input: action.input
        }
    }

    return state;
};

export default reducer;