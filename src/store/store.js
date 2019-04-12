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
    endpoint,
    accessUrlRelative
} from '../constants/api';
import handleNetworkError from './handleNetworkError';
import furniture, {assetsBySubType, nameByType} from '../__mocks/furniture';
import {occupations} from '../constants/app';

Vue.use(Vuex);

const localStorageMapping = {
    root: 'inn_map:',
    get state() {
        return `${this.root}state`
    },
    get refreshToken() {
        return `${this.root}refreshToken`
    },
    get accessToken() {
        return `${this.root}accessToken`
    },
};

const axiosInstance = axios.create({
    baseURL: restApiUrl,
    timeout: 5000,
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem(localStorageMapping.accessToken)}`;
// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    handleNetworkError(error);
    // Do something with request error
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    handleNetworkError(error);
    return Promise.reject(error);
});


function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}

const checkTokenIsActive = () => {
    const a = localStorage.getItem(localStorageMapping.accessToken);
    console.info(a);
    const aParsed = !!a && a !== 'null' ? parseJwt(a) : null;
    if (aParsed !== null) {
        console.info(aParsed);
        console.info(new Date(aParsed.exp  * 1000));
    }

    const r = localStorage.getItem(localStorageMapping.refreshToken);
    const rParsed = !!r && r !== 'null' ? parseJwt(r) : null;
    if (rParsed !== null) {
        console.info(rParsed);
        console.info(new Date(rParsed.exp  * 1000));
    }
}

checkTokenIsActive();

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

    updateLoggedInUser: 'updateLoggedInUser',
    addLoginError: 'addLoginError',
    updateAccessToken: 'updateAccessToken',
    updateRefreshToken: 'updateRefreshToken',

    startInit: 'startInit',
    endInit: 'endInit'
};

export const actions = {
    init: 'init',
    getEmployees: 'getEmployees',
    getItems: 'getItems',

    updateEmployee: 'updateEmployee',
    updateItem: 'updateItem',

    getUser: 'getUser',

    getAccessToken: 'getAccessToken'
};

const store = new Vuex.Store({
    state: {
        objectToFind: null,
        employees: [],
        furniture,
        placedObjects: [],
        draggedObject: null,

        loggedInAs: null,
        loginError: null,
        accessToken: null,
        refreshToken: null,

        initInProgress: true,


        selectedEmployee: null, // !
        occupations // !
    },
    mutations: {
        initialiseStore(state) {
            // Check if the ID exists
            if (localStorage.getItem(localStorageMapping.state)) {
                // Replace the state object with the stored item
                this.replaceState(
                    Object.assign(state, JSON.parse(localStorage.getItem('inn_map_state')))
                );
            }
        },
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

        [mutations.updateLoggedInUser](state, payload) {
            state.loggedInAs = payload;
        },

        [mutations.updateAccessToken](state, payload) {
            state.accessToken = payload;
        },

        [mutations.updateRefreshToken](state, payload) {
            state.refreshToken = payload;
        },

        [mutations.addLoginError](state, payload) {
            state.loginError = payload;
        },

        [mutations.startInit](state) {
            state.initInProgress = true;
        },

        [mutations.endInit](state) {
            state.initInProgress = false;
        },
    },

    actions: {
        [actions.init]({dispatch, commit}) {
            Promise.all([
                dispatch(actions.getEmployees),
                dispatch(actions.getItems)
            ]).then(() => {
                commit(mutations.endInit);
            }).catch((errors) => {
                console.info('errors', errors);
            });
        },
        [actions.getEmployees]({commit}) {
            return axiosInstance
                .get(endpoint.employee)
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
            return axios.put(changeEmployeeCoords(id), {
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

            return axios[method](url, {
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
            return axiosInstance
                .get(endpoint.item)
                .then((response) => {
                    console.info('[actions.getItems]', response.data);
                    commit(mutations.addItems, response.data);
                })
                .catch((error => {
                    console.error(`error in ${actions.getEmployees} action:`, error)
                }))
        },

        [actions.getAccessToken]({commit}, {username, password}) {
            axiosInstance
                .post(accessUrlRelative, {
                    username,
                    password
                })
                .then((payload) => {
                    commit(mutations.updateAccessToken, payload.data.access);
                    commit(mutations.updateRefreshToken, payload.data.refresh);
                })
                .catch(handleNetworkError);
        }
    }
})

function moveExistingObject(state, {coords, id}, objectsStore) {
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

store.subscribe((mutation, state) => {
    localStorage.setItem(localStorageMapping.state, JSON.stringify(state));
    localStorage.setItem(localStorageMapping.accessToken, state.accessToken);
    localStorage.setItem(localStorageMapping.refreshToken, state.refreshToken);
});

export default store;
