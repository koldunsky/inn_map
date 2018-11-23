<template>
  <div class="objectsHolder">
    <button
        v-for="empl in unplacedEmployees"
        :key="empl.id"
        class="employee"
        :class="{
          isSelected: selectedEmployee === empl.id
        }"
        @click="$store.commit('selectEmployeeToPutInPlace', empl.id)"
    >
      {{empl.name}}
    </button>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    components: {
    },
    computed: {
      ...mapState(['selectedEmployee', 'employees']),
      unplacedEmployees() {
        return this.$store.state.employees.filter((empl) =>
          empl.coords === null ||
          empl.coords.floor === undefined ||
          empl.coords.x === undefined ||
          empl.coords.y === undefined );
      }
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
