import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _each from 'lodash/each';
import _findIndex from 'lodash/findIndex';

import {getEmployeesUrl} from './constants/api';

import furniture from './__mocks/furniture';
import {occupations} from './constants/app';

Vue.use(Vuex);

const objectMap = {
  table: furniture[0],
  table_7: furniture[1],
};

export const mutations = {
  addEmpoyees: 'addEmpoyees',
  highlightOccupation: 'highlightOccupation',

  startDragObject: 'startDragObject',

  addNewObjectToMap: 'addNewObjectToMap',
  moveExistingObject: 'moveExistingObject',

  addNewEmployeeToMap: 'addNewEmployeeToMap',
  moveExistingEmployee: 'moveExistingEmployee',

  setObjectToFind: 'setObjectToFind',
  clearObjectToFind: 'clearObjectToFind'
};

export const actions = {
  getEmployees: 'getEmployees'
};

export default new Vuex.Store({
  state: {
    objectToFind: null,
    employees: [],
    furniture,
    placedObjects: [],
    draggedObject: null,
    selectedEmployee: null,
    floors: [],
    occupations,
  },
  mutations: {
    [mutations.addEmpoyees](state, employees) {
      employees = employees.map((empl) => ({
        ...empl,
        name: `${empl.person.first_name} ${empl.person.last_name}`,
        type: 'employee',
        isHighlited: false,
        email: empl.person.email,
        slack: 'slackDummy',
        slackLink: 'https://innovaco.slack.com/team/U5Q1H3KK6',
      }));
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

    [mutations.setObjectToFind](state, object) {
      state.objectToFind = object;
    },
    [mutations.clearObjectToFind](state, object) {

    },

    [mutations.startDragObject](state, object) {
      state.draggedObject = object;
    },

    [mutations.addNewObjectToMap](state, {coords, type}) {
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
      axios
        .get(getEmployeesUrl)
        .then((response) => {
          const transformedResponse = response.data.map((empl) => ({
            ...empl,
            x: parseInt(empl.latitude, 10),
            y: parseInt(empl.longitude, 10)
          }));
          commit(mutations.addEmpoyees, transformedResponse);
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