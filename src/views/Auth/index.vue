<template>
  <div class="COMPONENT_NAME">
      <form @submit.prevent="login" action="">
          <input v-model="username" type="text">
          <input v-model="password" type="text">
          <button>Логинъ</button>
      </form>
  </div>
</template>

<script>
    import {actions} from '../../store/store'

  export default {
    data() {
      return {
          username: '',
          password: ''
      };
    },
      methods: {
          login() {
              const {username, password} = this;
               this.$store.dispatch(actions.getAccessToken, {
                   username,
                   password
              })
          }
      },
    components: {},
    props: {}
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
