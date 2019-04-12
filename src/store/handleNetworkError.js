import router from '../router';
import _get from 'lodash/get';

export default ({message}) => {
    const errorMap = {
        'Request failed with status code 401': () => {
            router.push('/auth');
        }
    };

    _get(errorMap, message, console.warn)();
}

