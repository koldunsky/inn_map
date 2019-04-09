import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import _each from 'lodash/each';
import _get from 'lodash/get';
import _find from 'lodash/find';
import _findIndex from 'lodash/findIndex';

import {
    changeEmployeeCoords,
    changeItemCoords,
    employeesUrl,
    itemsUrl,
    restApiUrl,
    accessUrl,
    requestUrl
} from './constants/api';

import furniture, {assetsBySubType, nameByType} from './__mocks/furniture';
import {occupations} from './constants/app';

Vue.use(Vuex);

export const mutations = {
    addEmpoyees: 'addEmpoyees',
    addItems: 'addItems',
    highlightOccupation: 'highlightOccupation',

    startDragObject: 'startDragObject',

    addNewObjectToMap: 'addNewObjectToMap',
    moveExistingObject: 'moveExistingObject',

    addNewEmployeeToMap: 'addNewEmployeeToMap',
    moveExistingEmployee: 'moveExistingEmployee',

    setObjectToFind: 'setObjectToFind',
    clearObjectToFind: 'clearObjectToFind',

    login: 'login'
};

export const actions = {
    getEmployees: 'getEmployees',
    getItems: 'getItems',

    updateEmployee: 'updateEmployee',
    updateItem: 'updateItem',

    getUser: 'getUser',

    login: 'login'
};

export default new Vuex.Store({
    state: {
        objectToFind: null,
        employees: [],
        furniture,
        placedObjects: [],
        draggedObject: null,
        loggedInAs: null,
        selectedEmployee: null, // !
        occupations // !
    },
    mutations: {
        [mutations.addEmpoyees](state, employees) {
            employees = employees.map((empl) => ({
                ...empl,
                subType: 'human',
                name: `${empl.person.first_name} ${empl.person.last_name}`,
                type: 'employee',
                isHighlited: false,
                email: empl.person.email,
                slack: 'slack',
                slackLink: 'https://innovaco.slack.com/team/U5Q1H3KK6',
            }));
            state.employees = employees;
        },

        [mutations.addItems](state, items) {
            items = items.map((item) => {
                const subType = _get(item, 'extra_data.subType', 'table');
                const obj = {
                    ...item,
                    type: item.item_type,
                    id: item.id.toString(),
                    image: assetsBySubType[subType],
                    x: item.latitude,
                    y: item.longitude,
                    subType,
                };

                return obj;
            });
            state.placedObjects = items;
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

            state.employees = state.employees.map((empl) => {
                return {
                    ...empl,
                    isHighlighted: object.item.id === empl.id
                }
            });
        },

        [mutations.clearObjectToFind](state) {
            state.objectToFind = null;

            state.employees = state.employees.map((empl) => {
                return {
                    ...empl,
                    isHighlighted: false
                }
            });
        },

        [mutations.startDragObject](state, object) {
            state.draggedObject = object;
        },

        [mutations.addNewObjectToMap](state, item) {
            state.draggedObject = null;
            const {coords, subType} = item;
            const obj = {
                ..._find(furniture, {subType}),
                ...coords,
                id: `id_${Date.now()}`,
                subType
            };
            console.info('addNewObjectToMap', obj);
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

        [mutations.login](state, payload) {
            state.loggedInAs = payload;
        }
    },

    actions: {
        [actions.getEmployees]({commit}) {
            axios
                .get(employeesUrl)
                .then((response) => {
                    const transformedResponse = response.data.map((empl) => ({
                        ...empl,
                        id: empl.id.toString(),
                        x: parseInt(empl.latitude, 10),
                        y: parseInt(empl.longitude, 10)
                    }));
                    commit(mutations.addEmpoyees, transformedResponse);
                })
                .catch((error => {
                    console.error(`error in ${actions.getEmployees} action:`, error)
                }))
        },

        [actions.updateEmployee](context, {id, coords}) {
            axios.put(changeEmployeeCoords(id), {
                floor: coords.floor,
                longitude: coords.y,
                latitude: coords.x
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        [actions.updateItem](context, {id, coords, extraData, type = 'table'}) {
            const isNewItem = id === null;
            const method = isNewItem ? 'post' : 'put';
            const url = isNewItem ? itemsUrl : changeItemCoords(id);

            axios[method](url, {
                name: nameByType[type],
                floor: coords.floor,
                longitude: coords.y,
                latitude: coords.x,
                extra_data: extraData,
                type
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        [actions.getItems]({commit}) {
            axios
                .get(itemsUrl)
                .then((response) => {
                    console.info('[actions.getItems]', response.data);
                    commit(mutations.addItems, response.data);
                })
                .catch((error => {
                    console.error(`error in ${actions.getEmployees} action:`, error)
                }))
        },

        [actions.login]({commit}, {login, password}) {
            axios.post(accessUrl, {
                login,
                password
            }, {withCredentials: true})
                .then((payload) => {
                    console.info(payload);
                    commit(mutations.login, payload.data);
                })
                .catch(console.error);

        }

        // [actions.getUser]({commit}) {
        //     // Сюда будут приходить данные о юзере, если получаем 403, то
        // }
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
