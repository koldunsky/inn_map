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
    placedEmployees: [],
    draggedObject: null,
    selectedEmployee: null,
    floors: [
      // {
      //   employees: [],
      // }
    ],
    occupations,
  },
  mutations: {
    startDragObject(state, object) {
      state.draggedObject = object;
    },

    moveExistingObject(state, payload) {
      state.placedObjects = moveExistingObject(state, payload, state.placedObjects);
    },

    moveExistingEmployee(state, payload) {
      state.placedEmployees = moveExistingObject(state, payload, state.placedEmployees);
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


function moveExistingObject(state, {coords, id}, objectsStore) {
  const i = _findIndex(objectsStore, {id});
  if(i === -1) {
    console.error(`не найден объект с id=${id}`, 'list:', objectsStore);
    return false;
  }
  const placedObjects = [...objectsStore];
  let [nashParen]= objectsStore.filter((obj) => id == obj.id);
  nashParen = {
    ...nashParen,
    ...coords,
  };

  state.draggedObject = null;
  placedObjects.splice(i, 1);
  placedObjects.push(nashParen);

  return placedObjects;
};