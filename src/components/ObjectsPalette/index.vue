<template>
  <div class="objectsPalette">
    <div class="employees">
      <div
          class="empl"
          v-for="empl in unplacedEmployees"
          :key="empl.id"
      >
        <Employee
            type="employee"
            :image="require('../../assets/logo.png')"
            :employee="empl"
            :class="{
          isSelected: selectedEmployee === empl.id,
        }"
            @click="$store.commit('selectEmployeeToPutInPlace', empl.id)"
        >
          {{empl.name}}
        </Employee>
      </div>
    </div>
    <div class="furniture">
      <div
          v-for="furni in furniture"
          class="furni"
      >
        <img :src="furni.image" class="bg" >
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
  import { mapState } from 'vuex'
  import Table from '../_furniture/Table';
  import Employee from '../Employee';

  export default {
    components: {
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
          empl.coords === null ||
          empl.coords.floor === undefined ||
          empl.coords.x === undefined ||
          empl.coords.y === undefined );
      },
    }
  }
</script>

<style scoped lang="scss" src="./index.scss"></style>
