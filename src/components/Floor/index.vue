<template>
  <div
      class="floor"
      :style="{'z-index': 5 - index}"
      :data-index="index"
  >
    <img class="background" :src="bg">
    <div class="objectsField">
      <Table
          v-for="o in thisFloorPlacedObjects"
          :key="o.id"
          v-bind="o"
      >
      </Table>
    </div>
    <div class="employeesField">
      <Employee
          v-for="empl in thisFloorEmployees"
          v-bind="empl"
          :key="empl.name + empl.id"
          :employee="empl"
      />
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  import Employee from '../Employee';
  import Table from '../_furniture/Table';
  import Background from '../Background';

  export default {
    props: {
      bg: {
        type: String,
      },
      index: {
        type: Number,
        reqired: true
      }
    },
    components: {
      Employee,
      // eslint-disable-next-line
      Background,
      // eslint-disable-next-line
      Table,
    },

    methods: {},
    computed: {
      ...mapState(['floors', 'fieldMeasure', 'employees', 'placedObjects']),
      thisFloorEmployees() {
        return this.$store.state.employees.filter((empl) => {
          return (empl.x && empl.y) && parseInt(empl.floor, 10) === this.index;
        });
      },
      thisFloorPlacedObjects() {
        return this.$store.state.placedObjects.filter(o => parseInt(o.floor, 10) === this.index);
      }
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
