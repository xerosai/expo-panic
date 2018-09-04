/**
 * @description 'Profile' reducer
 */

import {PROFILE_ACTIONS} from '../constants';

const INITIAL_STATE = {
    deviceId: '',
    phoneNumber: '',
    name: ''
};

export default (state = INITIAL_STATE, action) => {
    console.log('profile reducer action: ', action);
    switch (action.type) {
        case PROFILE_ACTIONS.SET_PROFILE:
            return {...state, ...action.payload};
        case PROFILE_ACTIONS.UNSET_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
}