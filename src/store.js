import Vue from 'vue';
import Vuex from 'vuex';
import _each from 'lodash/each';
import _findIndex from 'lodash/findIndex';

import employees from './__mocks/eployees';
import {occupations, fieldWidth, fieldHeight, step} from './constants/app';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    employees,
    selectedEmployee: null,
    floors: [
      // {
      //   employees: [],
      // }
    ],
    occupations,
    fieldMeasure: {
      width: fieldWidth,
      height: fieldHeight,
      step: step
    }
  },
  mutations: {
    selectEmployeeToPutInPlace(state, id) {
      state.selectedEmployee = id;
    },

    clearSelectedEmployee(state) {
      state.selectedEmployee = null;
    },

    putEmployeeInPlace(state, {x, y, floor}) {
      const i = _findIndex(state.employees, {id: state.selectedEmployee});
      const copyOfEmployees = [...state.employees];
      const nashParen = {
        ...state.employees[i],
        coords: {
          x,
          y,
          floor
        }
      };

      copyOfEmployees.splice(i, 1, nashParen);
      state.employees = copyOfEmployees;
    },

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
