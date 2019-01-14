<template>
  <div class="objectsPalette">
    <div class="employees">
      <div
          class="empl"
          v-for="empl in unplacedEmployees"
          :key="empl.id"
      >
        <Employee
            v-bind="empl"
            :key="empl.name + empl.id"
            :employee="empl"
        />
      </div>
    </div>
    <div class="furniture">
      <div
          v-for="(furni, i) in furniture"
          class="furni"
          :key="i"
      >
        <img :src="furni.image" class="bg">
        <Table
            :image="furni.image"
            :type="furni.type"
            :cloneOnMouseUp="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import Table from '../_furniture/Table';
  import Employee from '../Employee';

  export default {
    components: {
      // eslint-disable-next-line vue/no-unused-components
      Table,
      Employee
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
          (empl.top === 0 && empl.left === 0) ||
          empl.floor === null);
      },
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
