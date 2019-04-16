import router, {route} from '../router';
import _get from 'lodash/get';

export default ({message}) => {
    const errorMap = {
        'Request failed with status code 401': () => {
            router.push(route.auth);
        }
    };

    _get(errorMap, message, console.warn)();
}

