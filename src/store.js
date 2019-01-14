import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _each from 'lodash/each';
import _findIndex from 'lodash/findIndex';

import employees from './__mocks/eployees';
import furniture from './__mocks/furniture';
import {occupations} from './constants/app';

Vue.use(Vuex);

const objectMap = {
  table: furniture[0],
  table_7: furniture[1],
};

export const mutations = {
  addUsers: 'addUsers',
  highlightOccupation: 'highlightOccupation',

  startDragObject: 'startDragObject',

  addNewObjectToMap: 'addNewObjectToMap',
  moveExistingObject: 'moveExistingObject',

  addNewEmployeeToMap: 'addNewEmployeeToMap',
  moveExistingEmployee: 'moveExistingEmployee',
};

export const actions = {
  getEmployees: 'getEmployees'
};

export default new Vuex.Store({
  state: {
    employees,
    furniture,
    placedObjects: [],
    draggedObject: null,
    selectedEmployee: null,
    floors: [],
    occupations,
  },
  mutations: {
    [mutations.addUsers](state, employees) {
      state.employees = employees;
    },
    [mutations.highlightOccupation](state, name) {
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
    },

    [mutations.startDragObject](state, object) {
      state.draggedObject = object;
    },

    [mutations.addNewObjectToMap](state, {coords, type}) {
      console.info(coords);
      state.draggedObject = null;
      const obj = {
        ...objectMap[type],
        ...coords,
        id: `id_${Date.now()}`
      };
      state.placedObjects.push(obj);
    },

    [mutations.moveExistingObject](state, payload) {
      state.placedObjects = moveExistingObject(state, payload, state.placedObjects);
    },

    [mutations.addNewEmployeeToMap](state, payload) {
      state.employees = moveExistingObject(state, payload, state.employees);
    },

    [mutations.moveExistingEmployee](state, payload) {
      state.employees = moveExistingObject(state, payload, state.employees);
    },
  },
  actions: {
    [actions.getEmployees]({commit}) {
      const restApiUrl = 'http://townhall.test4game.com/api/seat/';
      const url = __DEV__ ? 'http://0.0.0.0:8998/' + restApiUrl : restApiUrl;
      console.info(__DEV__);

      axios
        .get(url)
        .then((response) => {
          console.info(response);
          commit(mutations.addUsers, response.data);
        })
        .catch((error => {
          console.error(`error in ${actions.getEmployees} action:`, error)
        }))
    }
  }
})


function moveExistingObject(state, {coords, id}, objectsStore) {
  console.info(coords);
  const i = _findIndex(objectsStore, {id});
  if (i === -1) {
    console.error(`не найден объект с id=${id}`, 'list:', objectsStore);
    return false;
  }
  const placedObjects = [...objectsStore];
  let [nashParen] = objectsStore.filter((obj) => id == obj.id);
  nashParen = {
    ...nashParen,
    ...coords,
  };

  state.draggedObject = null;
  placedObjects.splice(i, 1);
  placedObjects.push(nashParen);

  return placedObjects;
}