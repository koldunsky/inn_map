export default {
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
