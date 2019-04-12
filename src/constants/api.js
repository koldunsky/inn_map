export const restApiUrl = 'https://townhall.test4game.com/api/';
export const accessUrl = `${restApiUrl}auth/token/obtain/`;
export const accessUrlRelative = `auth/token/obtain/`;
export const refreshUrl = `${restApiUrl}auth/token/refresh/`;
export const refreshUrlRelative = `auth/token/refresh/`;

export const endpoint = {
    employee: 'seat/',
    item: 'item/'
};

export const employeesUrl = restApiUrl + endpoint.employee + '/';
export const itemsUrl = restApiUrl + endpoint.item + '/';

export const changeEmployeeCoords = (id) => {
    return employeesUrl + id + '/';
};

export const changeItemCoords = (id) => {
    return itemsUrl + id + '/';
};

