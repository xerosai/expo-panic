/**
 * @description A collection of action creators
 */

import {PROFILE_ACTIONS} from '../constants';

export const setProfileData = payload => {
    return {
        type: PROFILE_ACTIONS.SET_PROFILE,
        payload
    };
};

export const unsetProfileData = () => {
    return {
        type: PROFILE_ACTIONS.UNSET_DATA
    };
};