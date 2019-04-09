export const restApiUrl = 'https://townhall.test4game.com/api/';
export const accessUrl = `${restApiUrl}auth/token/obtain/`;
export const refreshUrl = `${restApiUrl}auth/token/refresh/`;

const paths = {
    employee: 'seat',
    item: 'item'
};

export const employeesUrl = restApiUrl + paths.employee + '/';
export const itemsUrl = restApiUrl + paths.item + '/';

export const changeCoords = (id, type = 'employee') => {
    return type === 'employee' ? employeesUrl + id + '/' : itemsUrl;
};

export const changeEmployeeCoords = (id) => {
    return employeesUrl + id + '/';
};

export const changeItemCoords = (id) => {
    return itemsUrl + id + '/';
};

export const addItem = () => {
    return itemsUrl;
};

