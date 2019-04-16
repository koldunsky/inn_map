export const root = 'https://townhall.test4game.com/api/';

export const endpoint = {
    employee: 'seat/',
    item: 'item/',
    access: 'auth/token/obtain/',
    refresh: 'auth/token/refresh/'
};

export const changeEmployeeCoords = (id) => {
    return endpoint.employee + id + '/';
};

export const changeItemCoords = (id) => {
    return endpoint.item + id + '/';
};

