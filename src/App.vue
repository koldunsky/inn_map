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
            this.$store.dispatch(actions.login, {
                login: 'Ruslan.Koldunskiy',
                password: 'Forgetmen0t'
            }).then(() => {
                console.info(this.$store.state.loggedInAs);
                this.$store.dispatch(actions.getEmployees);
                this.$store.dispatch(actions.getItems);
            });
        },
    }
</script>
