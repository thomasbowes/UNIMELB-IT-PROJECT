import * as actionTypes from './actionTypes';


export const test = (input) => {
    return {
        type: actionTypes.TEST,
        input: input
    };
};