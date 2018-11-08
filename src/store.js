import Vue from 'vue';
import Vuex from 'vuex';
import _each from 'lodash/each';

import employees from './__mocks/eployees';
import {occupations} from './constants/app';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    employees,
    occupations
  },
  mutations: {
    highlightOccupation(state, name) {
      state.employees = state.employees.map((empl) => {
        return {
          ...empl,
          isHighlighted: name === empl.occupation
        }
      });
      _each(state.occupations, (occ, key) => {
        state.occupations[key] = {
          ...state.occupations[key],
          isHighlighted: name === occ.name
        };
      });
    }
  },
  actions: {}
})
