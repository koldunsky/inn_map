<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    import {actions} from './store/index';

    export default {
        data() {
            return {}
        },
        created() {
            this.$store.dispatch(actions.init);
            // this.$index.dispatch(actions.getAccessToken, {
            //     username: 'Ruslan.Koldunskiy',
            //     password: 'Forgetmen0t'
            // }).then(() => {
            //     this.$index.dispatch(actions.init);
            // });
        },
    }
</script>
