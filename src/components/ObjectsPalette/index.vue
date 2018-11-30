<template>
  <div class="objectsPalette">
    <div class="employees">
      <div
          v-for="empl in unplacedEmployees"
          :key="empl.id"
          class="employee"
          :class="{
          isSelected: selectedEmployee === empl.id
        }"
          @click="$store.commit('selectEmployeeToPutInPlace', empl.id)"
      >
        {{empl.name}}
      </div>
    </div>
    <div class="furniture">
      <div
          v-for="furni in furniture"
          :key="furni.image"
          class="furni"
      >
        <img :src="furni.image" >
        <Table :src="furni.image" />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Table from '../_furniture/Table';

  export default {
    components: {
      Table
    },
    methods: {
      onObjectClick(obj) {
        this.$store.commit('startDragObject', obj);
      }
    },
    computed: {
      ...mapState(['selectedEmployee', 'employees', 'furniture']),
      unplacedEmployees() {
        return this.$store.state.employees.filter((empl) =>
          empl.coords === null ||
          empl.coords.floor === undefined ||
          empl.coords.x === undefined ||
          empl.coords.y === undefined );
      },
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
