const restApiUrl = 'https://townhall.test4game.com/api/';

const paths = {
    employee: 'seat',
    item: 'items'
};

export const employeesUrl = restApiUrl + paths.employee + '/';
export const itemsUrl = restApiUrl + paths.item + '/';
export const changeCoords = (id, type = 'employee') => {
    return type === 'employee' ? employeesUrl + id + '/' : itemsUrl + id + '/';
};
