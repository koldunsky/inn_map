import Vue from 'vue';
import Vuex from 'vuex';
import _each from 'lodash/each';
import _findIndex from 'lodash/findIndex';

import employees from './__mocks/eployees';
import furniture from './__mocks/furniture';
import {occupations, fieldWidth, fieldHeight, step} from './constants/app';

Vue.use(Vuex);

const objectMap = {
  table: furniture[0],
  table_7: furniture[1],
};

export default new Vuex.Store({
  state: {
    employees,
    furniture,
    placedObjects: [],
    draggedObject: null,
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
    startDragObject(state, object) {
      state.draggedObject = object;
    },

    moveExistingObject(state, {coords, id}) {
      const i = _findIndex(state.placedObjects, {id});
      if(i === -1) {
        console.error(`ненайден объект с id=${id}`, 'list:', state.placedObjects);
        return false;
      }
      const placedObjects = [...state.placedObjects];
      let [nashParen]= state.placedObjects.filter((obj) => id == obj.id);
      nashParen = {
        ...nashParen,
        ...coords,
      };

      state.draggedObject = null;
      placedObjects.splice(i, 1);
      placedObjects.push(nashParen);

      state.placedObjects = placedObjects;
    },

    addNewObjectToMap(state, {coords, type}) {
      state.draggedObject = null;
      const obj = {
        ...objectMap[type],
        ...coords,
        id: `id_${Date.now()}`
      };
      state.placedObjects.push(obj);
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
