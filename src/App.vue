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
      this.$store.dispatch(actions.getEmployees);
      this.$store.dispatch(actions.getItems);
    },
  }
</script>
