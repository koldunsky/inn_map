import {mutations} from "../../store/index";

export default {
    [mutations.updateLoggedInUser](state, payload) {
        state.loggedInAs = payload;
    },

    [mutations.updateAccessToken](state, payload) {
        state.accessToken = payload;
    },

    [mutations.updateRefreshToken](state, payload) {
        state.requestToken = payload;
    }
}
