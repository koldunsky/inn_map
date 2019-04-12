<template>
    <div id="app">
        <router-view/>
    </div>
</template>
<script>
    import {actions} from './store';

    export default {
        data() {
            return {}
        },
        created() {
            // this.$store.dispatch(actions.init);
            this.$store.dispatch(actions.getAccessToken, {
                username: 'Ruslan.Koldunskiy',
                password: 'Forgetmen0t'
            }).then(() => {
                this.$store.dispatch(actions.init);
            });
        },
    }
</script>
